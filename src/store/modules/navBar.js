/**
 * navbar module
**/

export default {
  namespaced: true,
  state: {
    isActive: false,
    smallNavIsEnabled: true,
    headerIsEnabled: true
  },
  
  mutations: {
    toggleNavigation (state, status) {
      state.isActive = status
    },
    toggleSmallNavigation (state, status) {
      state.smallNavIsEnabled = status
    },
    toggleHeader (state, status) {
      state.headerIsEnabled = status
    }
  }
}
