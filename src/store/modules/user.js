export default {
  state: {
    currentUser: {
      id: '',
      role: '',
      name: '',
      email: ''
    }
  },
  mutations: {
    SET_CURRENT_USER (state, currentUserData) {
      state.currentUser = currentUserData
    }
  },
  // getters: {
  //   isLoggedIn(state) {
  //     return firebase.auth().currentUser == null?false:true;
  //   }
  // },
  actions: {
    getCurrent ({ commit }) {
      return UsersService.getCurrent()
        .then(user => commit('SET_CURRENT_USER', user.data))
        .catch(error => commit('toast/NEW', { type: 'error', message: error.message }, { root: true }))
    }
  }
}
