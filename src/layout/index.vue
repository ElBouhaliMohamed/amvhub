<template>
  <div id="app">
      <AppHeader></AppHeader>
      <AppNavbar></AppNavbar>
      <!-- <div :class="[{wrapper: navbarIsActive}, {navbarMargin: !navbarIsActive}]"> -->
      <div class="wrapper pt-28 md:pt-20">
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
  computed: {
    navbarIsActive: function () {
      return this.$store.state.navbar.isActive
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
