<template>
    <div v-if="!gridItem" class="block transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100 sm:border-b sm:border-gray-300"> <!-- list  -->
        <div class="px-2 py-4">
            <div class="flex flex-row flex-1 min-w-0 md:flex-col">
                <div class="flex-shrink-0 block pl-4 group focus:outline-none"  v-if="showUser">
                    <div class="flex items-center">
                        <router-link :to="`/channel/${userUuid}`">
                            <img class="inline-block w-8 h-8 rounded-full md:h-16 md:w-16" src="../assets/avatar.jpg" alt="avatar" />
                        </router-link>
                        <div class="hidden ml-3 md:block">
                            <p class="text-xl font-bold leading-5 text-gray-700 group-hover:text-gray-900">
                                {{userName}}
                            </p>
                            <router-link :to="`/channel/${userUuid}`"
                                class="text-xs font-medium leading-4 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-900 group-focus:underline">
                                View profile
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row w-full md:pt-2">
                    <router-link :to="`/video/${videoUuid}`" class="flex-shrink-0 w-1/2 pl-4 lg:w-1/4">
                        <div class="relative aspect-ratio-16/9">
                        <!-- <img class="absolute object-cover w-full h-full" :src="thumbnail"> -->
                        <lazy-img :lazy-src="thumbnail" class="absolute object-cover w-full h-full"/>
                        </div>
                    </router-link>
                    <div class="flex flex-col w-1/2 pl-2 lg:w-3/4">
                        <div class="block">
                            <span class="px-4 text-2xl font-bold leading-5 text-gray-900">
                                <router-link :to="`/video/${videoUuid}`">{{title}}</router-link>
                            </span>
                            <span class="flex flex-col px-4 text-xs font-thin leading-5 text-gray-500 md:flex-row md:text-sm">
                                <router-link :to="`/channel/${userUuid}`" class="block font-medium leading-5 truncate md:hidden">{{userName}}</router-link>
                                <span class="flex flex-row">
                                <span>{{views}} views</span>
                                <span class="block px-1 md:px-2">&#8226;</span>
                                <time v-bind:datetime="date[0]">{{timeSince(date[1])}}</time>
                                </span>
                            </span>
                        </div>
                        <span class="hidden w-full px-4 py-2 text-sm font-thin leading-6 text-gray-900 md:block" id="description" v-html="description"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="block transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"> <!-- grid  -->
      <div class="flex flex-row flex-1 min-w-0 md:flex-col">
          <div class="flex-shrink-0 block pl-4 group focus:outline-none"  v-if="showUser">
              <div class="flex items-center">
                  <router-link :to="`/channel/${userUuid}`">
                  <img class="inline-block w-8 h-8 rounded-full md:h-16 md:w-16" src="../assets/avatar.jpg" alt="avatar" />
                  </router-link>
                  <div class="hidden ml-3 md:block">
                  <p class="text-xl font-bold leading-5 text-gray-700 group-hover:text-gray-900">
                      {{userName}}
                  </p>
                  <router-link :to="`/channel/${userUuid}`"
                      class="text-xs font-medium leading-4 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-900 group-focus:underline">
                      View profile
                  </router-link>
                  </div>
              </div>
          </div>
          <div class="flex flex-col">
            <router-link :to="`/video/${videoUuid}`" class="flex-shrink-0 w-full">
                <div class="relative aspect-ratio-16/9">
                  <!-- <img class="absolute object-cover w-full h-full" :src="thumbnail"> -->
                  <lazy-img :lazy-src="thumbnail" class="absolute object-cover w-full h-full"/>
                </div>
            </router-link>
            <div class="flex flex-1">
                <div class="flex flex-col pt-1">
                        <span class="min-w-0 overflow-hidden text-lg font-bold leading-5 text-gray-900 truncate md:text-xl">
                            <router-link class="" :to="`/video/${videoUuid}`">{{title}}</router-link>
                        </span>
                        <span class="flex flex-col text-xs font-thin leading-4 text-gray-600 md:flex-row">
                            <router-link :to="`/channel/${userUuid}`" class="block font-medium leading-5 truncate md:hidden">{{userName}}</router-link>
                            <span class="flex flex-row">
                                <span>{{views}} views</span>
                                <span class="block px-1 text-xs md:px-2">&#8226;</span>
                                <time v-bind:datetime="date[0]">{{timeSince(date[1])}}</time>
                            </span>
                        </span>
                </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    userUuid: String,
    userName: String,
    videoUuid: String,
    thumbnail: String,
    title: String,
    date: Array,
    views: Number,
    description: String,
    showUser: Boolean,
    gridItem: {
      type: Boolean,
      required: false,
      placeholder: false
    }
  }
}
</script>

<style scoped>
    #description >>> p {
        @apply text-left break-all truncate max-h-28
    }
</style>
