<template>
  <div class="container w-full mx-auto flex items-center py-4 bg-primary shadow-lg">
    <div class="w-1/2 flex">
      <button class="ml-4 h-8 w-12 flex items-center justify-center text-secondary" @click="toggleNavigation">
        <font-awesome-icon icon="bars"/>
      </button>
      <input type="text" class="searchBox" placeholder="Search">
      <a href="#" class="searchIcon">
        <font-awesome-icon class="text-secondary" icon="search"/>
      </a>
    </div>

    <nav class="w-32 ml-4">
      <router-link to="/">
        <logo/>
      </router-link>
    </nav>

    <nav class="w-1/2 flex items-center text-center justify-end">
      <a href="#" class="top-nav-item text-secondary">
        <font-awesome-icon icon="bell" size="lg"/>
      </a>
      <a href="#" class="top-nav-item text-secondary">
        <font-awesome-icon icon="envelope" size="lg"/>
      </a>
      <div class="mr-4">
        <a href="#">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import * as authService from "../services/auth.service";
import logo from "../components/logo.vue";

export default {
  name: "Header",
  methods: {
    toggleNavigation() {
      console.log("test");
      this.$store.commit('navBar/toggleNavigation', true);
    }
  },
  components: {
    logo
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  @apply .w-1/4 .text-secondary .rounded-l .text-xs .py-2 .px-2;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  background-color: rgba(0, 0, 0, 0.05);
}

.searchBox:focus {
  @apply .w-5/6;
  outline: none;
}

.searchIcon {
  @apply .rounded-r .h-8 .py-2 .px-2;
}
</style>