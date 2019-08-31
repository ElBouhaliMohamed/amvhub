<template>
  <nav class="headerContainer">
    <div class="w-11/12 flex md:w-1/4">
      <!-- <button class="ml-4 h-8 w-12 flex items-center justify-center " @click="toggleNavigation">
        <div class="fa fa-bars"></div>
      </button>
      <span class="flex w-full">
        <input type="text" class="searchBox" placeholder="Search">
        <a href="#" class="searchIcon">
          <div class="fa fa-search  hover:"></div>
        </a>
      </span> -->
    </div>

    <div class="w-2/4 logo flex items-center text-center justify-center">
      <router-link to="/">
        <logo/>
      </router-link>
    </div>

    <div class="w-full mt-2 md:w-1/4 flex items-center text-center justify-end">
      <!-- <a href="#" class="top-nav-item ">
        <div class="fa fa-bell"></div>
      </a>
      <a href="#" class="top-nav-item ">
        <div class="fa fa-envelope"></div>
      </a> -->
      <button v-if="isLoggedIn" class="btn btn-primary mr-4" @click="logout">LOGOUT</button>
      <div class="mr-4">
        <!-- <router-link to="/channel"> -->
          <button v-if="!isLoggedIn" class="btn btn-primary" @click="login">LOG IN</button>
          <img v-else :src="avatar" alt="avatar" class="avatar">
        <!-- </router-link> -->
      </div>
    </div>

  </nav>
</template>

<script>
import logo from '../components/logo.vue'
import firebase from 'firebase'

export default {
  name: 'Header',
  data () {
    return {
      lightMode: true
    }
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('navbar/toggleNavigation', !this.isActive);
    },
    login () {
      this.$router.push('/login');
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.commit('user/SET_LOGGED_IN', false);
        this.$router.replace('/login')
      })
    }
  },
  computed: {
    avatar: function() {
      return this.$store.state.user.currentUser != null ? this.$store.state.user.currentUser.userInfo.photoURL : '';
    },
    isActive: function () {
      return this.$store.state.navbar.isActive;
    },
    isLoggedIn: function() {
      return this.$store.state.user.isLoggedIn;
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="scss" scoped>

.searchBox {
  @apply .w-full .rounded-l .text-xs .py-1 .px-2;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  background-color: rgba(0, 0, 0, 0.05);
}

.searchBox:focus {
  outline: none;
}

.searchIcon {
  @apply .rounded-r .h-8 .py-2 .px-2;
  background-color: rgba(0, 0, 0, 0.05);
  height: 34px;
}

.logo {
    display: none;
}

.headerContainer {
  @apply .sticky .top-0 .z-50 .w-full .mx-auto .flex .flex-col .items-start .py-4 .bg-background;
}

.avatar {
  @apply .h-12 .w-12 .rounded-full;
  -webkit-transition: width 0.4s, height 0.4s ease-in-out;
  transition: width 0.4s, height 0.4s ease-in-out;
}

@screen md {
  .headerContainer {
    @apply .flex-row .items-center;
  }
  .logo {
    @apply .block;
  }
  .searchBox {
    @apply .w-1/4 .py-2;
  }
    
  .searchBox:focus {
    @apply .w-5/6;
    outline: none;
  }

}

</style>
