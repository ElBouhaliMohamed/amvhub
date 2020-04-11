const getDefaultState = () => {
  return {
    title: '',
    description: '',
    songs: [{ artist: '', title: '' }],
    sources: [{ title: '' }],
    categorys: [],
    tags: [],
    progress: 0,
    url: '',
    uuid: '',
    stateId: 0,
    currentView: 'uploadComponent',
    isDone: false,
    thumbnailsProcessed: false,
    thumbnailUrls: [],
    selectedThumbnail: 1,
    creationDate: new Date().toISOString().slice(0, 10),
    visibility: 0 // 0 private, 1 unlisted, 2 public
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    selectedThumbnail: state => {
      return state.selectedThumbnail
    },
    thumbnailUrls: state => {
      return state.thumbnailUrls
    },
    thumbnailsProcessed: state => {
      return state.thumbnailsProcessed
    },
    isDone: state => {
      return state.isDone
    },
    currentView: state => {
      return state.currentView
    },
    visibility: state => {
      return state.visibility
    },
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
    categorys: state => {
      return state.categorys
    },
    progress: state => {
      return state.progress
    },
    url: state => {
      return state.url
    },
    uuid: state => {
      return state.uuid
    },
    stateId: state => {
      return state.stateId
    },
    description: state => {
      return state.description
    },
    creationDate: state => {
      return state.creationDate
    }
  },
  mutations: {
    SET_SELECTEDTHUMBNAIL: (state, selectedThumbnail) => {
      state.selectedThumbnail = selectedThumbnail
    },
    SET_THUMBNAILURLS: (state, thumbnailUrls) => {
      Object.assign(state.thumbnailUrls, thumbnailUrls)
    },
    SET_THUMBNAILSPROCESSED: (state, thumbnailsProcessed) => {
      state.thumbnailsProcessed = thumbnailsProcessed
    },
    SET_CREATIONDATE: (state, creationDate) => {
      state.creationDate = creationDate
    },
    SET_ISDONE: (state, isDone) => {
      state.isDone = isDone
    },
    SET_CURRENTVIEW: (state, currentView) => {
      state.currentView = currentView
    },
    SET_STATEID: (state, stateId) => {
      state.stateId = stateId
    },
    SET_VISIBILITY: (state, visibility) => {
      state.visibility = visibility
    },
    SET_TITLE: (state, title) => {
      state.title = title
    },
    SET_DESCRIPTION: (state, description) => {
      state.description = description
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
    PUSH_CATEGORY: (state, tag) => {
      state.categorys.push(tag)
    },
    SET_CATEGORYS: (state, tags) => {
      state.categorys = tags
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_URL: (state, url) => {
      state.url = url
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    },
    CLEAR: (state) => {
      Object.assign(state, getDefaultState())
    }
  }
}
