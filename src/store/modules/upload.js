export default {
  namespaced: true,
  state: {
    title: '',
    songs: [
      { artist: 'Test', title: 'Test' }
    ],
    sources: [
      { title: 'Test' }
    ],
    tags: [],
    progress: 0,
    url: '',
    uuid: ''
  },
  getters: {
    title: state => {
      return state.title
    },
    songs: state => {
      return state.songs
    },
    sources: state => {
      return state.sources
    },
    tags: state => {
      return state.tags
    },
    progress: state => {
      return state.progress
    },
    url: state => {
      return state.url
    },
    uuid: state => {
      return state.uuid
    }
  },
  mutations: {
    SET_TITLE: (state, title) => {
      state.title = title
    },
    PUSH_SONG: (state, song) => {
      state.songs.push(song)
    },
    REMOVE_SONG: (state, index) => {
      state.songs.splice(index, 1)
    },
    PUSH_SOURCE: (state, source) => {
      state.sources.push(source)
    },
    REMOVE_SOURCE: (state, index) => {
      state.sources.splice(index, 1)
    },
    PUSH_TAG: (state, tag) => {
      state.tags.push(tag)
    },
    SET_TAGS: (state, tags) => {
      state.tags = tags
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_URL: (state, url) => {
      state.url = url
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    }
  }
}
