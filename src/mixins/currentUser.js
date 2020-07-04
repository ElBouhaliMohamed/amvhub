export default {
  computed: {
    $currentUser () {
      if (!this.$store.getters['user/isLoggedIn']) return { userInfo: { uuid: '' } }
      return this.$store.state.user.currentUser
    },
    $isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    }
  }
}
