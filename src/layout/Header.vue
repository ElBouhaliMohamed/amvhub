<template>
  <nav class="headerContainer">
    <div id="header" class="w-1/2 flex">
      <button class="ml-4 h-8 w-12 flex items-center justify-center text-secondary-100" @click="toggleNavigation">
        <div class="fa fa-bars"></div>
      </button>
      <input type="text" class="searchBox" placeholder="Search">
      <a href="#" class="searchIcon">
        <div class="fa fa-search text-secondary-100 hover:text-secondary-50"></div>
      </a>
    </div>

    <div class="w-32 ml-4">
      <router-link to="/">
        <logo/>
      </router-link>
    </div>

    <div class="w-1/2 flex items-center text-center justify-end">
      <a href="#" class="top-nav-item text-secondary-100">
        <div class="fa fa-bell"></div>
      </a>
      <a href="#" class="top-nav-item text-secondary-100">
        <div class="fa fa-envelope"></div>
      </a>
      <div class="mr-4">
        <router-link to="/channel">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
        </router-link>
      </div>
    </div>


  </nav>
</template>

<script>
import * as authService from "../services/auth.service";
import logo from "../components/logo.vue";

export default {
  name: "Header",
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      lightMode: true
    }
  },
  methods: {
    toggleNavigation() {
      if(this.isActive)
        this.$store.commit('navbar/toggleNavigation', false);
      else
        this.$store.commit('navbar/toggleNavigation', true);
    }
  },
  computed: {
    isActive: function() {
      return this.$store.state.navbar.isActive;
    }
  },
  components: {
    logo
  }
};
</script>

<style lang="scss" scoped>

.headerContainer {
  @apply .sticky .pin-t .z-50 .w-full .mx-auto .flex .items-center .py-4 .bg-primary-100;
}

.avatar {
  @apply .h-8 .w-8 .rounded-full;
  -webkit-transition: width 0.4s, height 0.4s ease-in-out;
  transition: width 0.4s, height 0.4s ease-in-out;
}
</style>