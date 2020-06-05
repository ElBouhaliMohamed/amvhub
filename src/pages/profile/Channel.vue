<template>
  <div class="pb-32 bg-gray-50">
    <div class="pb-32 bg-gray-900">
      <div>
        <div class="relative aspect-ratio-53/9">
          <img src="@/assets/banner.jpg" class="absolute object-cover w-full h-full">
        </div>
        
        <!-- <div class="absolute right-0 mr-4 -mt-8 sm:-mt-16 xl:-mt-32 w-1/8">

        </div> -->

        <div class="w-full lg:w-4/6">
          <div class="flex items-center justify-between px-2 max-w-7xl sm:px-4 lg:px-6">
              <nav class="relative flex w-full h-full -mb-2">
                  <router-link id="one" active-class="text-gray-50" :to="`/channel/${userId}/videos`" class="w-1/4 px-1 py-8 text-sm font-bold leading-5 text-center text-gray-400 uppercase hover:text-gray-100 focus:outline-none focus:text-gray-50">
                    Videos
                  </router-link>
                  <router-link id="two" active-class="text-gray-50" :to="`/channel/${userId}/test`" class="w-1/4 px-1 py-8 text-sm font-bold leading-5 text-center text-gray-400 uppercase hover:text-gray-100 focus:outline-none focus:text-gray-50">
                    Comments
                  </router-link>
                  <router-link id="three" active-class="text-gray-50" :to="`/channel/${userId}/test2`" class="w-1/4 px-1 py-8 text-sm font-bold leading-5 text-center text-gray-400 uppercase hover:text-gray-100 focus:outline-none focus:text-gray-50">
                    About
                  </router-link>
                  <hr />
              </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row w-full">
      <main class="w-full -mt-32 lg:w-4/6">
        <div class="px-2 pb-12 max-w-7xl sm:px-4 lg:px-6">
          <div class="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
            <router-view></router-view>
          </div>
        </div>
      </main>

      <div class="hidden w-2/6 -mt-32 lg:block">
        <div class="px-2 pb-12 mx-auto max-w-7xl sm:px-4 lg:px-6">
          <div class="relative bg-gray-900 rounded-lg shadow">
            <div class="flex items-end justify-end h-32 bg-gray-800 rounded-t-lg">
                <follow-button class="hidden h-10 m-4 xl:inline-flex" :isLoggedIn="isLoggedIn" :userId="userId"></follow-button>
            </div>
            <router-link class="absolute w-32 border-2 rounded-lg border-gray-50 left-5 top-9" to="#">
                <img src="@/assets/avatar.jpg" alt="avatar">
            </router-link>
            <div class="flex items-center px-2 pt-8 pb-4 mx-auto max-w-7xl sm:px-4 lg:px-6">
              <div class="flex flex-col py-4">
                <h1 class="text-xl font-bold leading-6 text-gray-50">Kazumoe</h1>
                <p class="mt-2 leading-6 text-gray-300"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga placeat fugit, explicabo atque cumque vel molestiae enim quo, beatae corrupti deleniti aliquam sed sint nostrum veniam, quis similique consequuntur? Officia!</p>
                <div class="flex flex-row flex-wrap mt-2">
                  <span class="flex items-center mr-2 text-gray-300">
                    <svg fill="currentColor" class="w-5 h-5 mr-1" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                    <p>Düsseldorf, Germany</p>
                  </span>
                  <span class="flex items-center mr-2 text-gray-300">
                    <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    <p>Since March 2019 on amvhub</p>
                  </span>
                  <span class="flex items-center mr-2 text-gray-300">
                    <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    <p>Editing since 2011</p>
                  </span>
                </div>
                <follow-button class="w-full mt-4 xl:hidden" :isLoggedIn="isLoggedIn" :userId="userId"></follow-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import followButton from '../../components/followButton.vue'
export default {
  components: {
    followButton
  },
  data () {
    return {
    }
  },
  computed: {
    userId () {
      return this.$route.params.id
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

hr {
  @apply absolute bottom-0 w-1/4 h-4 m-0 transition-all duration-500 ease-in-out bg-gray-50 border-none rounded-t-md
}

#two.router-link-exact-active ~ hr {
  @apply ml-1/4
}

#three.router-link-exact-active ~ hr {
  @apply ml-1/2
}

#one:hover ~ hr {
  @apply m-0
}

#two:hover ~ hr {
  @apply ml-1/4
}

#three:hover ~ hr {
  @apply ml-1/2
}

</style>
