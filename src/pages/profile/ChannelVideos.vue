<template>
<div class="flex flex-col">
  <div class="flex flex-row justify-between">
    <div class="flex items-center text-center">
      <h1 class="pl-2 text-xl font-bold text-gray-900">Uploads</h1>
    </div>
    <div class="flex pr-2">
      <simple-dropdown class="mr-4" title="Sort">
        <div class="w-full py-1">
          <button @click="sortVideos('popular')" class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Most popular
          </button>
          <button @click="sortVideos('newest')" class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Newest
          </button>
          <button @click="sortVideos('oldest')" class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Oldest
          </button>
        </div>
      </simple-dropdown>
      <span class="relative z-0 inline-flex rounded-md shadow-sm">
        <button @click="grid = true" type="button" class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 group rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
          <svg class="w-4 h-4 text-gray-700 group-hover:text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </button>
        <button @click="grid = false" type="button" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 group rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
          <svg  class="w-4 h-4 text-gray-700 group-hover:text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
      </span>
    </div>
  </div>
  <div class="flex flex-row flex-wrap">
      <feedEntry :class="{'w-1/2 md:w-1/4 px-2 pt-2':grid}" v-for="video in videos" v-bind:key="video.uuid" :gridItem="grid" :showUser="false" :userUuid="video.user.uuid" :userName="video.user.name" :videoUuid="video.uuid" :thumbnail="video.thumbnail" :title="video.title" :date="video.date" :views="video.views" :description="video.description" />
  </div>
</div>
</template>

<script>

export default {
  components: {
    feedEntry: () => ({
      component: import('../../components/feedEntry')
    })
  },
  data () {
    return {
      grid: true
    }
  },
  computed: {
    videos () {
      return this.$store.getters['channel/videos']
    }
  },
  methods: {
    sortVideos (type) {
      this.$store.commit('channel/SORT_VIDEOS', { type, videos: this.videos })
    }
  }
}
</script>

<style>

</style>
