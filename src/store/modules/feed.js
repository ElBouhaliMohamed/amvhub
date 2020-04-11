import firebase from 'firebase'

const compare = function (a, b) {
  let d1 = new Date(a.date[0])
  let d2 = new Date(b.date[0])
  if (d1.getTime() < d2.getTime()) {
    return 1
  } else if (d1.getTime() > d2.getTime()) {
    return -1
  } else {
    return 0
  }
}

export default {
  namespaced: true,
  state: {
    currentTimeline: [],
    lastItemUid: '',
    indexCounter: 1,
    reachedEndOfTimeline: false
  },
  mutations: {
    clearFeed (state) {
      state.currentTimeline = []
      state.lastItemUid = ''
      state.indexCOunter = 1
      state.reachedEndOfTimeline = false
    },
    pushEntry (state, entry) {
      state.currentTimeline.push(entry)
    },
    sortFeed (state) {
      state.currentTimeline.sort(compare)
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

          // if (index % 5 === 0) {
          //   context.commit('setLastItemUid', entry.id)
          // }

          index++
        }
        context.commit('setIndex', index)
        console.log(context.state.currentTimeline)
        // context.commit('sortFeed')

        return { success: true }
      } catch (err) {
        return { success: false, error: err }
      }
    }
  }
}
