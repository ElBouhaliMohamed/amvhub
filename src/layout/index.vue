<template>
  <div id="app">
      <AppHeader></AppHeader>
      <AppNavbar></AppNavbar>
      <!-- <div :class="[{wrapper: navbarIsActive}, {navbarMargin: !navbarIsActive}]"> -->
      <div class="wrapper" :class="{'pt-28 md:pt-19' : headerEnabled}">
          <vue-progress-bar></vue-progress-bar>
          <transition name="fade">
            <router-view></router-view>
          </transition>
      </div>
      <!-- <AppFooter></AppFooter> -->
  </div>
</template>

<script>
import AppHeader from './Header.vue'
import AppFooter from './Footer.vue'
import AppNavbar from '../components/navbar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,
    AppNavbar
  },
  beforeMount () {
    this.$store.dispatch('theme/initTheme')
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },
  computed: {
    navbarIsActive: function () {
      return this.$store.state.navbar.isActive
    },
    headerEnabled: function () {
      return (
        this.$store.state.navbar.headerIsEnabled
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  @apply .antialiased;
  transition: color 700ms ease;
}

.wrapper {
  transition: margin 700ms ease;
}

.navbarMargin {
  @apply mt-7;
  transition: margin 700ms ease;
}
</style>
