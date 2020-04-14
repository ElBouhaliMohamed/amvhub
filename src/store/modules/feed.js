import firebase from 'firebase'

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
    clearFeed: (state) => {
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
    generate (context, uid) {
      var generateFeed = firebase.functions().httpsCallable('firestoreGenerateFeed')
      generateFeed({ uid }).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    async generateFeedForFollowers (context, uid) {
      let followersCollection = await firebase.firestore().collection('users').doc(uid).collection('followers').get()
      for (let follower of followersCollection.docs) {
        let followerData = follower.data()
        context.dispatch('generate', followerData.uid)
      }
    },
    async fetchFeed (context, uid) {
      try {
        let feedCollection = null
        if (context.state.lastItemUid === '') {
          feedCollection = await firebase.firestore().collection('users').doc(uid).collection('feed').orderBy('createdAt', 'desc').limit(5).get()
        } else {
          let lastItem = await firebase.firestore().collection('users').doc(uid).collection('feed').doc(context.state.lastItemUid).get()
          feedCollection = await firebase.firestore().collection('users').doc(uid).collection('feed').orderBy('createdAt', 'desc').startAfter(lastItem).limit(5).get()
        }
    
        if (feedCollection.docs.length === 0) {
          context.commit('hasReachedEndOfTimeline', true)
          return { success: true }
        }

        context.commit('setLastItemUid', feedCollection.docs[feedCollection.docs.length - 1].id)

        let index = context.state.indexCounter
        for (let entry of feedCollection.docs) {
          let data = entry.data()
          let createdAt = data.createdAt.toDate()

          let thumbnailsRef = await firebase.firestore().doc(`thumbnails/${data.uuid}/`)
          let thumbnailsQuery = await thumbnailsRef.get()
          let thumbnails = thumbnailsQuery.data()
          let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

          let userSnapshot = await data.user.get()
          let userData = userSnapshot.data()

          context.commit('pushEntry', {
            id: index,
            editors: data.editors,
            title: data.title,
            uuid: data.uuid,
            views: data.views,
            date: [createdAt.toISOString(), createdAt.toGMTString()],
            thumbnail: currThumbnail,
            user: userData
          })

          index++
        }
        context.commit('setIndex', index)
        // console.log(context.state.currentTimeline)
        // context.commit('sortFeed')

        return { success: true }
      } catch (err) {
        return { success: false, error: err }
      }
    }
  }
}
