<template>
  <div id="app" class="antialiased bg-secondary">
      <AppHeader></AppHeader>
      <AppNavbar></AppNavbar>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <AppFooter></AppFooter>
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
  }
};
</script>