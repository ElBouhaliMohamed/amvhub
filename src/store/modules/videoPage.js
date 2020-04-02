/**
 * navbar module
**/

export default {
  namespaced: true,
  state: {
    author: '',
    title: '',
    views: 0,
    hearts: 0,
    tags: Array,
    categories: Array,
    theaterMode: false
  },
  getters: {
    theaterMode: state => {
      return state.theaterMode
    }
  },
  mutations: {
    SET_THEATERMODE: (state, theaterMode) => {
      state.theaterMode = theaterMode
    }
  }
}
