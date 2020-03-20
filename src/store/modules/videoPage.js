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
    aspectRatio: '16-9'
  },
  getters: {
    aspectRatio: state => {
      return state.aspectRatio
    }
  },
  mutations: {
    SET_ASPECTRATIO: (state, aspectRatio) => {
      state.aspectRatio = aspectRatio
    }
  }
}