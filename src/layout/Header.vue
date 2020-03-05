<template>
  <nav class="headerContainer">
    <div class="w-11/12 flex sm:w-2/5">
      <button class="ml-4 h-8 w-12 flex items-center justify-center " @click="toggleNavigation">
        <div class="fa fa-bars btn-action"></div>
      </button>
      <span class="flex w-full">
        <input type="text" class="searchBox" placeholder="Search">
        <a href="#" class="searchIcon">
          <div class="fa fa-search btn-action"></div>
        </a>
      </span>
    </div>

    <div class="hidden md:flex w-1/5 logo items-center text-center justify-center">
      <router-link to="/">
        <logo/>
      </router-link>
    </div>

    <div class="w-full mt-2 md:w-2/5 flex items-center text-center justify-end">
      <!-- <a href="#" class="top-nav-item ">
        <div class="fa fa-bell"></div>
      </a>
      <a href="#" class="top-nav-item ">
        <div class="fa fa-envelope"></div>
      </a> -->
      <button v-if="isLoggedIn" class="btn btn-action" @click="logout">Log Out</button>
      <button v-if="isLoggedIn" class="mr-4 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out">
        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      </button>
      <div class="mr-4 flex">
        <!-- <router-link to="/channel"> -->
          <button v-if="!isLoggedIn" class="btn btn-action" @click="login">Log In</button>
          <router-link v-if="!isLoggedIn" to="signup" class="btn btn-action">Sign Up</router-link>
          <div v-else v-on-clickaway="closePopup" class="ml-3 relative">
            <div>
              <button @click="open = !open" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                <img :src="avatar" alt="avatar" class="avatar">
              </button>
            </div>
            <transition
            enter-class="ease-out duration-100"
            enter-active-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-class="ease-in duration-75"
            leave-active-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95">
              <div v-show="open" class="transform origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                <div class="py-1 rounded-md bg-white shadow-xs">
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Your Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Settings</a>
                  <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Sign out</a>
                </div>
              </div>
            </transition>
          </div>
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
      lightMode: true,
      open: false
    }
  },
  methods: {
    closePopup () {
      this.open = false
    },
    toggleNavigation () {
      this.$store.commit('navbar/toggleNavigation', !this.isActive)
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('user/SET_LOGGED_IN', false)
        this.$router.replace('/login')
      })
    }
  },
  computed: {
    avatar: function () {
      return this.$store.state.user.currentUser != null ? this.$store.state.user.currentUser.userInfo.photoURL : ''
    },
    isActive: function () {
      return this.$store.state.navbar.isActive
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="scss" scoped>

.searchBox {
  @apply .w-full .rounded-l .text-xs .py-1 .px-2 text-white;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  background-color: rgba(255, 255, 255, 0.05);
}

.searchBox:focus {
  outline: none;
}

.searchIcon {
  @apply .rounded-r .h-8 .py-2 .px-2;
  background-color: rgba(255, 255, 255, 0.05);
  height: 34px;
}

.logo {
    display: none;
}

.headerContainer {
  @apply .fixed .flex .flex-col .z-40 .w-full .mx-auto .items-start .py-4 .bg-gray-900 .shadow-lg .border-0;
}

.avatar {
  @apply .h-8 .w-8 .rounded-full;
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
