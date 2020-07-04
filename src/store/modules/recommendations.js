
const getDefaultState = () => {
  return {
    currentTimeline: [],
    lastItemUid: '',
    indexCounter: 1,
    reachedEndOfTimeline: false
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    clearRecommendations: (state) => {
      Object.assign(state, getDefaultState())
    },
    pushEntry (state, entry) {
      state.currentTimeline.push(entry)
    },
    setLastItemUid (state, item) {
      state.lastItemUid = item
    },
    setIndex (state, index) {
      state.indexCounter = index
    },
    hasReachedEndOfTimeline (state, val) {
      state.reachedEndOfTimeline = val
    }
  },
  actions: {
    async fetchRecommendation (context, uuid) {
      try {
        let recommendationsCollection = null
        if (context.state.lastItemUid === '') {
          recommendationsCollection = await firestore.collection('users').doc(uuid).collection('recommendations').orderBy('score', 'desc').limit(5).get()
        } else {
          let lastItem = await firestore.collection('users').doc(uuid).collection('recommendations').doc(context.state.lastItemUid).get()
          recommendationsCollection = await firestore.collection('users').doc(uuid).collection('recommendations').orderBy('score', 'desc').startAfter(lastItem).limit(5).get()
        }
    
        if (recommendationsCollection.docs.length === 0) {
          context.commit('hasReachedEndOfTimeline', true)
          return { success: true }
        }

        context.commit('setLastItemUid', recommendationsCollection.docs[recommendationsCollection.docs.length - 1].id)

        let index = context.state.indexCounter
        for (let entry of recommendationsCollection.docs) {
          let data = entry.data()
          let createdAt = toDateTime(data.createdAt._seconds)

          let thumbnailsRef = await firestore.doc(`thumbnails/${data.uuid}/`)
          let thumbnailsQuery = await thumbnailsRef.get()
          let thumbnails = thumbnailsQuery.data()
          let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

          let userSnapshot = await firestore.doc(`users/${data.user.uuid}`).get()
          let userData = userSnapshot.data()

          let editors = Array.from(data.editors, editor => editor.name)

          context.commit('pushEntry', {
            id: index,
            editors: editors,
            title: data.title,
            uuid: data.uuid,
            views: data.views,
            date: [createdAt.toISOString(), createdAt.toGMTString()],
            thumbnail: currThumbnail,
            user: userData,
            description: data.description
          })

          index++
        }
        context.commit('setIndex', index)

        return { success: true }
      } catch (err) {
        return { success: false, error: err }
      }
    }
  }
}

function toDateTime (secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}
