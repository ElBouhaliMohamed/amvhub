<template>
  <div class="pb-32 bg-gray-50">
    <div class="pb-32 bg-gray-900">
      <div>
        <div class="relative aspect-ratio-53/9">
          <img src="@/assets/banner.jpg" class="absolute object-cover w-full h-full">
        </div>
        
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
          <div class="relative flex flex-col text-center bg-white rounded-lg shadow">
            <div class="flex flex-col flex-1 p-8">
                <img class="flex-shrink-0 w-32 h-32 mx-auto bg-black rounded-full" src="@/assets/avatar2.png" alt="">
                <h3 class="mt-6 text-sm font-medium leading-5 text-gray-900">Kazumoe</h3>
                <dl class="flex flex-col justify-between flex-grow mt-1">
                  <!-- <dt class="sr-only">Title</dt> -->
                  <!-- <dd class="text-sm leading-5 text-gray-500">Paradigm Representative</dd> -->
                  <dt class="sr-only">Infos</dt>
                  <dd class="flex flex-col mt-3 text-sm leading-5 text-gray-500">
                    <span class="flex items-center justify-center mr-2">
                      <svg fill="currentColor" class="w-5 h-5 mr-1" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                      <p>Düsseldorf, Germany</p>
                    </span>
                    <span class="flex items-center justify-center mr-2">
                      <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                      <p>Since March 2019 on amvhub</p>
                    </span>
                    <span class="flex items-center justify-center mr-2">
                      <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                      <p>Editing since 2011</p>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="border-t border-gray-200">
                <follow-button v-slot="slotProps" class="flex -mt-px" :isLoggedIn="isLoggedIn" :userId="userId">
                  <div class="flex flex-1 w-0 border-r border-gray-200">
                    <button @click="slotProps.follow" class="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                      <!-- <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg> -->
                      <svg class="w-5 h-5 text-gray-400" :class="{'hidden':slotProps.followed, 'text-gray-400':!slotProps.followed}" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                      </svg>
                      <span class="ml-3" v-if="!slotProps.followed">Follow</span>
                      <span class="ml-3" v-else>Unfollow</span>
                    </button>
                  </div>
                  <div class="flex flex-1 w-0 -ml-px">
                    <span href="#" class="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
                      <!-- <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg> -->
                      <span class="ml-3">{{ slotProps.followersCount }} Followers</span>
                    </span>
                  </div>
                </follow-button>
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
    this.$store.commit('channel/SET_UUID', this.userId)
    await this.$store.dispatch('channel/fetchVideos')
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
