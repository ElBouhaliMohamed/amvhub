export default {
  namespaced: true,
  state: {
    loading: false,
    error: false,
    items: [],
    pagination: {
      limit: 10,
      page: 0,
      total: 0
    }
  },
  mutations: {
    SET_ITEMS (state, data) {
      state.items = data
    },
  
    SET_PAGINATION (state, payload) {
      state.pagination = {
        page: payload.page || state.pagination.page,
        limit: payload.limit || state.pagination.limit,
        total: payload.total || state.pagination.total
      }
    },
  
    SET_ERROR (state, data) {
      state.error = data
    },
  
    SET_LOADING (state, data) {
      state.loading = data
    }
  },
  getters: {
    isEmpty: (state) => !state.items.length
  },
  actions: {
    getListPublic ({ state, commit }, payload) {
      commit('SET_LOADING', true)
      return PostsService.getListPublic(payload.params)
        .then(response => {
          commit('SET_ITEMS', response.data.content)
          commit('SET_PAGINATION', { total: response.data.total })
        })
        .catch(error => commit('SET_ERROR', error.message))
        .finally(() => commit('SET_LOADING', false))
    }
  }
}
