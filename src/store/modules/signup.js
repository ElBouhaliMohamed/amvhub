const getDefaultState = () => {
    return {
        username: '',
        email: '',
        password: '',
        about: '',
        notifications: {
          comments: false,
          subscribers: false,
          videos: false
        },
        avatar: null,
        banner: null
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        username: state => {
          return state.username
        },
        email: state => {
          return state.email
        },
        password: state => {
          return state.password
        },
        about: state => {
          return state.about
        },
        notifications: state => {
          return state.notifications
        },
        avatar: state => {
          return state.avatar
        },
        banner: state => {
          return state.banner
        }
      },
    mutations: {
      SET_USERNAME (state, username) {
        state.username = username
      },
      SET_EMAIL (state, email) {
        state.email = email
      },
      SET_PASSWORD (state, password) {
        state.password = password
      },
      SET_ABOUT (state, about) {
        state.about = about
      },
      SET_NOTIFICATIONS (state, notifications) {
        state.notifications = notifications
      },
      SET_AVATAR (state, avatar) {
        state.avatar = avatar
      },
      SET_BANNER (state, banner) {
        state.banner = banner
      }
    }
  }
  