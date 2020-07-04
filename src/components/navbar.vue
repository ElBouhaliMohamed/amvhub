<template>
  <nav>
    <div :class="[smallNav, {smallNavActive: smallNavIsEnabled}]">
      <div class="hidden md:block w-1/8 lg:w-1/4"></div>
      <div class="flex flex-col w-1/2 md:flex-row">
        <!-- <span class="flex items-center ml-2">
          <span class="text-xs font-bold uppercase">view</span>
          <button>
            <span class="ml-2 fas fa-list"></span>
          </button>
          <button>
            <span class="ml-2 fas fa-th"></span>
          </button>
        </span>
      -->
        <span class="hidden h-5 mr-4 border-l-2 md:block"></span>

        <span class="flex ml-2 md:ml-0">
          <router-link class="flex items-center pr-2 text-center" tag="a" to="/trending">
            <div class="fas fa-fire fa-sm"></div>
            <span class="pl-1 text-xs font-bold uppercase">Trending</span>
          </router-link>
          <router-link class="flex items-center px-2 text-center" tag="a" to="/feed">
            <div class="fas fa-home fa-sm"></div>
            <span class="pl-1 text-xs font-bold uppercase">Feed</span>
          </router-link>
          <router-link class="flex items-center pl-2 text-center" tag="a" to="/featured">
            <div class="fas fa-bullhorn fa-sm"></div>
            <span class="pl-1 text-xs font-bold uppercase">Featured</span>
          </router-link>
        </span>

        <span class="hidden h-5 mx-4 border-l-2 md:block"></span>
      </div>
      <div class="w-1/4"></div>
    </div>

    <div class="top-0 z-50 flex overflow-hidden bg-gray-100" @keydown.esc="isActive = false">
      <!-- Off-canvas menu for mobile -->
      <div @click="isActive = false" class="fixed inset-0 z-40 transition-opacity duration-300 ease-linear bg-gray-400 opacity-0 pointer-events-none" :class="{'opacity-75 pointer-events-auto': isActive, 'opacity-0 pointer-events-none': !isActive}"></div>
      <div class="fixed inset-y-0 left-0 z-50 flex flex-col w-full max-w-xs duration-300 ease-in-out transform bg-gray-800 " :class="{'translate-x-0': isActive, '-translate-x-full': !isActive}">
          <div class="absolute top-0 right-0 p-1 mt-1 -mr-14">
              <button v-if="isActive" @click="isActive = false" class="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600">
                  <svg class="w-6 h-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </div>
          <!-- <div class="flex items-center flex-shrink-0 h-20 px-4 bg-gray-800">
              <logo/>
          </div> -->
          <div class="flex-1 h-0 overflow-y-auto">
              <nav class="px-2 py-4">
                  <router-link to="/feed" class="flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                      <svg class="w-6 h-6 mr-4 text-gray-300 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"/>
                      </svg>
                      Feed
                  </router-link>
                  <router-link to="/trending" class="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                      Trending
                  </router-link>
                  <router-link to="/featured" class="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      <svg class="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                      </svg>
                      Featured
                  </router-link>
                  <router-link to="/guides" class="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                      Guides
                  </router-link>
                  <router-link to="/contests" class="flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      <svg class="w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                      </svg>
                      Contests
                  </router-link>
              </nav>
          </div>
          <div class="flex flex-shrink-0 p-4 bg-gray-700" v-if="isLoggedIn">
            <a href="#" class="flex-shrink-0 block group">
              <div class="flex items-center">
                <div>
                  <img class="inline-block w-10 h-10 rounded-full" :src="userInfo.photoURL" alt="avatar" />
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium leading-6 text-white">
                    {{userInfo.name}}
                  </p>
                  <p class="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                    View profile
                  </p>
                </div>
              </div>
            </a>
          </div>
      </div>
    </div>

    <backToTop visibleoffset="500"></backToTop>
  </nav>
</template>

<script>
import backToTop from '../components/backToTop.vue'
import { auth } from './../services/firebase.service'

import logo from '../components/logo.vue'

export default {
  name: 'Navbar',
  data () {
    return {
      bigNav: 'bigNav',
      smallNav: 'smallNav'
    }
  },
  computed: {
    dashboardNavigation: function () {
      return (
        this.$store.state.navbar.smallNavIsEnabled
      )
    },
    smallNavIsEnabled: function () {
      return (
        this.$store.state.navbar.smallNavIsEnabled &&
        !this.$store.state.navbar.isActive
      )
    },
    isActive: {
      get: function () {
        return this.$store.state.navbar.isActive
      },
      set: function (newValue) {
        this.$store.commit('navbar/toggleNavigation', newValue)
      }
    },
    isDarkMode: function () {
      return this.$store.state.theme.isDarkMode
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
    userInfo: function () {
      return this.$currentUser == null ? { photoURL: '', name: '' } : this.$currentUser.userInfo
    }
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('navbar/toggleNavigation', false)
    },
    switchTheme () {
      this.$store.dispatch('theme/switchTheme')
    },
    logout () {
      auth.signOut().then(() => {
        this.$store.commit('user/SET_LOGGED_IN', false)
        this.$router.replace('login')
      })
    }
  },
  components: {
    backToTop,
    logo
  }
}
</script>

<style lang="scss" scoped>

.is-active {
  @apply text-white bg-gray-900;
}

.is-active:hover {
  @apply bg-gray-800;
}

hr {
  @apply z-50;
  height: 0.25rem;
  width: 25%;
  margin: 0;
  background: tomato;
  border: none;
  transition: 0.3s ease-in-out;
}

.bigNav > a {
  @apply text-center font-hairline uppercase px-4;

  text-decoration: none;
  letter-spacing: 0.15em;

  display: inline-block;
  width: 25%;
  margin: 0;
}

.smallNav {
  @apply z-40 w-full flex flex-row overflow-hidden justify-start items-center text-black;
  top: 67px;
  height: 0px;
  -webkit-transition: height 250ms ease-in-out;
  -moz-transition: height 250ms ease-in-out;
  -o-transition: height 250ms ease-in-out;
  transition: height 250ms ease-in-out;
}

.smallNavActive {
  @apply h-16 w-full;
}

.bigNav {
  @apply flex-1 flex flex-col fixed overflow-hidden h-screen z-40 top-0 shadow-lg bg-gray-800;
  top: 110px;
  width: 0px;
  -webkit-transition: width 250ms ease-in-out;
  -moz-transition: width 250ms ease-in-out;
  -o-transition: width 250ms ease-in-out;
  transition: width 250ms ease-in-out;
}

.bigNavActive {
  @apply w-full;
}

.bigNavEntry {
  @apply flex  h-16 pl-4 pr-16 items-center text-white;

  -webkit-transition: all 250ms ease-in-out;
  -moz-transition: all 250ms ease-in-out;
  -o-transition: all 250ms ease-in-out;
  transition: all 250ms ease-in-out;
}

.bigNavEntry:hover {
  @apply bg-gray-700 text-purple-500;
}

.bigNavEntry.is-active {
  @apply pl-8 bg-gray-600 text-purple-500;
}

.toggle {
  @apply .ml-4 .h-8 .w-12;
  transition: all 0.2s ease-out;
}

.toggle:hover {
  @apply;
  left: 235px;
}

.searchContainer {
  @apply .flex .pt-8 .px-8;
}

.searchBox {
  background-color: rgba(255, 255, 255, 0.05);
}

.searchIcon {
  background-color: rgba(255, 255, 255, 0.05);
}

.switch {
  @apply .flex .items-center .text-center mx-4;
  position: relative;
  width: 50px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 0px;
  bottom: -5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  @apply;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@screen md {
  .bigNav {
    top: 80px;
  }
  .bigNavActive {
    @apply w-64;
  }
  .smallNavActive {
    @apply h-8;
  }
}
</style>
