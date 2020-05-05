<template>
  <nav v-if="headerEnabled" class="transition-colors duration-700 headerContainer" :class="{'bg-gray-900': !theaterMode, 'bg-black': theaterMode}">
    <div class="flex w-11/12 md:w-2/5">
      <button class="flex items-center justify-center w-12 h-8 ml-4 " @click="toggleNavigation">
        <div class="fa fa-bars btn-action"></div>
      </button>
      <span class="flex w-full group">
        <input type="text" class="searchBox" placeholder="Search" v-model="search">
        <router-link :to="{path: 'search', query: {name: search}}" class="searchIcon">
          <div class="fa fa-search btn-action"></div>
        </router-link>
      </span>
    </div>

    <div class="items-center justify-center hidden w-1/5 text-center md:flex logo">
      <router-link to="/">
        <logo/>
      </router-link>
    </div>

    <div class="flex items-center justify-between w-full mt-2 text-center md:justify-end md:w-2/5">
      <router-link class="ml-8 md:hidden" to="/">
        <logo/>
      </router-link>

      <div class="flex items-center justify-end w-1/2 text-center">
        <router-link to="/admin/upload" v-if="isLoggedIn" class="mr-4 text-gray-400 transition-all duration-500 ease-in-out border-2 border-transparent rounded-full hover:text-gray-300 focus:outline-none focus:text-indigo-600">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17a5 5 0 01-.916-9.916 5.002 5.002 0 019.832 0A5.002 5.002 0 0116 17m-7-5l3-3m0 0l3 3m-3-3v12"></path></svg>
        </router-link>

        <button v-if="isLoggedIn" class="mr-4 text-gray-400 transition-all duration-500 ease-in-out border-2 border-transparent rounded-full hover:text-gray-300 focus:outline-none focus:text-gray-500 focus:bg-gray-100">
          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>

        <div class="flex flex-shrink-0 mr-8">
            <button v-if="!isLoggedIn" class="btn btn-action" @click="login">Log In</button>
            <router-link v-if="!isLoggedIn" to="signup" class="btn btn-action">Sign Up</router-link>

              <div v-else v-on-clickaway="closePopup" class="relative ml-3">
                <div>
                  <button @click="open = !open" class="flex text-sm transition duration-150 ease-in-out rounded-full focus:outline-none">
                    <img :src="avatar" alt="avatar" class="avatar">
                  </button>
                </div>
                  <div v-if="open" class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                    <div class="py-1 bg-white rounded-md shadow-xs">
                      <div class="px-4 py-3">
                          <div class="flex items-center justify-start">
                            <div>
                              <img class="inline-block w-10 h-10 rounded-full" :src="$currentUser.userInfo.photoURL" alt="avatar" />
                            </div>
                            <div class="ml-2">
                              <p class="text-base font-bold text-black">
                                {{$currentUser.userInfo.name}}
                              </p>
                            </div>
                          </div>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div class="py-1">
                        <router-link :to="'/channel/' + $currentUser.userInfo.uuid" class="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 group hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                          <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          Your Profile
                        </router-link>
                        <a href="#" class="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 group hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                          Settings
                        </a>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div class="py-1">
                        <a class="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer group hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" @click="logout">
                          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
              </div>
        </div>
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
      open: false,
      search: ''
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
      this.open = false
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
    },
    headerEnabled: function () {
      return (
        this.$store.state.navbar.headerIsEnabled
      )
    },
    theaterMode () {
      return this.$store.getters['videoPage/theaterMode']
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
  @apply .fixed .flex .flex-col .z-40 .w-full .mx-auto .items-start .py-4 .shadow-lg .border-0;
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
