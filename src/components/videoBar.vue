<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit" class="flex flex-col items-center justify-center w-full pl-8 overflow-hidden align-center" id="suggested">
    <div class="flex flex-row justify-start w-full mb-3" v-for="(video, index) in videos" v-bind:key="index">
      <!-- <router-link draggable="false" to="/channel/" class="relative pb-2/3">
      </router-link> -->
      <div class="w-1/2">
        <div class="relative aspect-ratio-16/9">
          <img class="absolute object-cover w-full h-full transition-all duration-200 ease-in-out transform hover:scale-70" src="@/assets/thumbnail.png"/>
        </div>
      </div>

      <div class="flex flex-col w-1/2 pl-2"> <!-- video infos here -->
        <span class="text-lg font-bold leading-6 text-gray-900">{{video.title}}</span>
        <span class="text-sm font-medium leading-6 text-gray-900">{{video.editor}}</span>
        <span class="flex flex-row text-xs leading-5">
          <span>{{video.views}} views</span>
          <span class="block px-1 md:px-2">&#8226;</span>
          <time v-bind:datetime="video.date[0]">{{video.date[1]}}</time>
        </span>
      </div>

    </div>
    <loadingAnimation v-if="busy" class="w-4 h-4 mb-4"></loadingAnimation>
    <!-- <button type="button" class="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-center text-indigo-700 transition duration-150 ease-in-out bg-indigo-200 border border-transparent rounded-md hover:bg-indigo-100 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200">
      Load more...
    </button> -->
  </div>
</template>

<script>
import loadingAnimation from './loadingAnimation2'

export default {
  data: function () {
    return {
      canLoad: false,
      limit: 5,
      busy: false,
      videos: [
        {
          editor: 'Kazumoe',
          title: 'Atonement',
          views: 301,
          date: ['2020-12-15', 'December 15, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          editor: 'Spike',
          title: 'Beautiful Crime',
          views: 602,
          date: ['2020-12-01', 'December 1, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          editor: 'Dr Penguin',
          title: 'Test video 3',
          views: 1100,
          date: ['2020-01-07', 'Januar 7, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          editor: "Soul's Team",
          title: 'This is a logn ass title just too test the looks',
          views: 500,
          date: ['2020-01-07', 'Januar 7, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          editor: "Soul's Team",
          title: 'Another one',
          views: 25000,
          date: ['2020-01-07', 'Januar 7, 2020'],
          avatar: '../assets/avatar.jpg'
        }
      ]
    }
  },
  components: {
    loadingAnimation
  },
  computed: {
  },
  methods: {
    loadMore () {
      this.busy = true
      setTimeout(() => {
        for (var i = 0, j = 5; i < j; i++) {
          this.videos.push({
            id: 1,
            editor: 'Kazumoe',
            title: 'Atonement',
            views: 301,
            date: ['2020-12-15', 'December 15, 2020'],
            avatar: '../assets/avatar.jpg'
          })
        }
        this.busy = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  display: block;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 123.5px;
  width: 220px;

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  transform: scale(1.01);
}

.thumbnail:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.thumbnailWrapper {
  transition: all 500ms ease-in-out;
}
</style>
