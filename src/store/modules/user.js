import UsersService from '../../services/users.service'
export default {
  state: {
    currentUser: null,
    isLoggedIn: false
  },
  mutations: {
    SET_CURRENT_USER (state, currentUserData) {
      state.currentUser = currentUserData;
    },
    SET_LOGGED_IN (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    }
  },
  actions: {
    getCurrent ({ commit }) {
      return UsersService.getCurrent()
        .then(user => commit('SET_CURRENT_USER', user))
        .catch(error => console.log(error));
    }
  }
}