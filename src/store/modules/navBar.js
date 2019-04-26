/**
 * navbar module
**/

export default {
    namespaced: true,
    state: {
      isActive: false
    },
  
    mutations: {
      toggleNavigation(state, status) {
        state.isActive = status;
      }
    }
  }
  