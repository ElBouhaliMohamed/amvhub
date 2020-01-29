export default {
  namespaced: true,
  state: {
    title: '',
    songs: [''],
    sources: [''],
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
    SET_SONGS: (state, songs) => {
      state.songs = songs
    },
    SET_SOURCES: (state, sources) => {
      state.sources = sources
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
