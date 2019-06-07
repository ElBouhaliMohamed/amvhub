<template>
  <div id="app">
      <AppHeader></AppHeader>
      <AppNavbar></AppNavbar>
      <!-- <div :class="[{wrapper: navbarIsActive}, {navbarMargin: !navbarIsActive}]"> -->
      <div class="wrapper">
          <transition name="fade">
            <router-view></router-view>
          </transition>
          <AppFooter></AppFooter>
      </div>
  </div>
</template>

<script>
import AppHeader from "./Header.vue";
import AppFooter from "./Footer.vue";
import AppNavbar from "../components/navbar.vue";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppFooter,
    AppNavbar,
  },
  beforeMount() {
    this.$store.dispatch('theme/initTheme');
  },
  computed: {
    navbarIsActive: function() {
      return this.$store.state.navbar.isActive;
    },
  }
};
</script>

<style lang="scss" scoped>
#app {
  @apply antialiased bg-background-100;
  
  transition: color 700ms ease;
}

.wrapper {
  @apply mt-7;
  transition: margin 700ms ease;
}

.navbarMargin {
  @apply mt-7;
  transition: margin 700ms ease;
}
</style>