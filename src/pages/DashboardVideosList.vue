<template>
  <div class="flex flex-col p-10">
    <div class="flex items-center justify-between pb-8">
        <h1 class="text-xl font-semibold leading-5">Your uploads</h1>
        <div class="flex flex-row items-center justify-center">
          <div class="flex mt-1 rounded-md shadow-sm">
            <div class="relative flex-grow focus-within:z-10">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path></svg>
              </div>
              <input id="title" class="block w-full pl-10 transition duration-150 ease-in-out rounded-md form-input sm:text-sm sm:leading-5" placeholder="Video Title" v-model="filters.title.value"/>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
          <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table v-if="loading" class="min-w-full">
                      <thead>
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Thumbnail
                          </th>
                          <th defaultSort="desc" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Title
                          </th>
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Visibility
                          </th>
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Views
                          </th>
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Hearts
                          </th>
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Rating
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </thead>
                      <tr class="skeleton-box">
                          
                      </tr>
                  </table>
                  <v-table v-if="!loading" :data="videos" class="min-w-full" :filters="filters">
                      <thead slot="head">
                          <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Thumbnail
                          </th>
                          <v-th sortKey="title" defaultSort="desc" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Title
                          </v-th>
                          <v-th sortKey="visibility" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Visibility
                          </v-th>
                          <v-th sortKey="views" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Views
                          </v-th>
                          <v-th sortKey="hearts" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Hearts
                          </v-th>
                          <v-th sortKey="hearts" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Rating
                          </v-th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </thead>
                      <tbody slot="body" slot-scope="{displayData}" class="bg-white">
                      <tr v-for="row in displayData" :key="row.uuid">
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div class="flex items-center">
                                  <div class="relative flex-shrink-0 w-full aspect-ratio-16/9">
                                      <lazy-img alt="thumbnail" :lazy-src="row.thumbnail" class="absolute object-cover w-full h-full"/>
                                      <!-- <img class="absolute object-cover w-full h-full" :src="row.thumbnail" alt="thumbnail" /> -->
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div class="text-sm font-medium leading-5 text-gray-900">
                                  {{row.title}}
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                  {{row.visibility}}
                              </span>
                          </td>
                          <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              {{row.views}}
                          </td>
                          <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                              {{row.hearts}}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <!-- <span class="text-sm leading-5 text-gray-500">{{row.rating}} / 10 (median of {{row.ratingsCount}} Votes)</span> -->
                          </td>
                          <td class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                              <router-link :to="`/dashboard/video/${row.uuid}`" class="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </router-link>
                          </td>
                      </tr>
                      </tbody>
                  </v-table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    loadingAnimation: () => ({
      component: import('../components/loadingAnimation2')
    })
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //   })
  // },
  async mounted () {
    this.$store.dispatch('dashboardVideos/fetchVideos', this.$currentUser.userInfo.uuid)
    this.loading = false
  },
  data () {
    return {
      loading: true,
      filters: {
        title: {
          value: '', keys: ['title']
        }
      }
    }
  },
  computed: {
    videos () {
      return this.$store.getters['dashboardVideos/videos']
    }
  }
}
</script>
