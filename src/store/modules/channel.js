import { firestore } from './../../services/firebase.service'
import { sortMostPopular, sortNewest, sortOldest } from '../../services/videos.service'

const getDefaultState = () => {
  return {
    uuid: '',
    userVideos: [],
    sortType: 'popular'
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    videos (state) {
      return state.userVideos
    }
  },
  mutations: {
    clearUserVideos: (state) => {
      state.userVideos = []
    },
    pushEntry (state, entry) {
      state.userVideos.push(entry)
    },
    SET_UUID (state, uuid) {
      state.uuid = uuid
    },
    SORT_VIDEOS (state, { type, videos }) {
      state.sortType = type
      switch (type) {
        case 'popular':
          videos = sortMostPopular(videos)
          break
        case 'newest':
          videos = sortNewest(videos)
          break
        case 'oldest':
          videos = sortOldest(videos)
          break
      }
      Object.assign(state.userVideos, videos)
    }
  },
  actions: {
    async fetchVideos ({ state, commit }) {
      try {
        commit('clearUserVideos')

        let userQuery = firestore.collection('users').doc(state.uuid)
        let userRef = await userQuery.get()
        let userData = userRef.data()

        let videosSnapshot = await firestore.collection('videos').where('user', '==', userQuery).get()
        let videos = []

        for (let entry of videosSnapshot.docs) {
          let data = entry.data()
          let createdAt = data.createdAt.toDate()

          let thumbnailsRef = firestore.doc(`thumbnails/${data.uuid}/`)
          let thumbnailsQuery = await thumbnailsRef.get()
          let thumbnails = thumbnailsQuery.data()
          let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

          videos.push({
            editors: data.editors,
            title: data.title,
            uuid: data.uuid,
            views: data.views,
            date: [createdAt.toISOString(), createdAt.toGMTString()],
            dateForSorting: createdAt,
            thumbnail: currThumbnail,
            user: userData,
            description: data.description
          })
        }

        commit('SORT_VIDEOS', { type: state.sortType, videos })

        return { success: true }
      } catch (err) {
        console.log(err)
        return { success: false, error: err }
      }
    }
  }
}
