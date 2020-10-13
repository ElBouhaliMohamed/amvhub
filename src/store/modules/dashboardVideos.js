import { getVideosForUser } from '../../services/videos.service'

const getDefaultState = () => {
  return {
    videos: [],
    isLoaded: false
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    videos (state) {
      return state.videos
    },
    isLoaded (state) {
      return state.isLoaded
    }
  },
  mutations: {
    clear: (state) => {
      Object.assign(state, getDefaultState())
    },
    pushEntry (state, entry) {
      state.videos.push(entry)
    },
    setEntrys (state, entrys) {
      Object.assign(state.videos, entrys)
    },
    isLoaded (state, value) {
      state.isLoaded = value
    }
  },
  actions: {
    async fetchVideos ({ state, commit }, uuid) {
      if (!state.isLoaded) {
        let entrys = await getVideosForUser(uuid)
        if (entrys.success) {
          commit('setEntrys', entrys.videos)
          commit('isLoaded', true)
        }
      }
    }
  }
}
