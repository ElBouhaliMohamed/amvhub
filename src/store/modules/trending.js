export default {
  namespaced: true,
  state: {
    muted: true
  },
  getters: {
    isMuted (state) {
      return state.muted
    }
  },
  mutations: {
    toggleMute (state, val) {
      state.muted = val
    }
  }
}
