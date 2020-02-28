<template>
  <div class="bg-gray-900 block">
    <div class="absolute w-full background-gradient">
        <trending-carousel />
    </div>
    <div class="absolute left-0 right-0 container w-full lg:w-3/4 mx-auto videoWrapper">
        <video-entry v-for="video in videos" :key="video.uuid" :uuid="video.uuid" :title="video.title" :editor="video.editor" :length="video.length" :thumbnail="video.thumbnail" :preview="video.preview" :tags="video.tags"></video-entry>
    </div>
  </div>
</template>

<script>
import videoEntry from '../components/videoEntry.vue'
import trendingCarousel from '../components/trendingCarousel.vue'
import firebase from 'firebase'

export default {
  name: 'Trending',
  mounted() {
    this.fetchVideos();
  },
  data: function () {
    return {
      videos: [],
    }
  },
  components: {
    videoEntry,
    trendingCarousel
  },
  methods: {
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    async fetchVideos() {
      let videosQuery = await firebase.firestore().collection("videos").get();
      let size = videosQuery.size;
      let index = 1;
      videosQuery.forEach(async (result) => {
        let data = result.data();
        let editor = await data.user.get();
        let video = {
          uuid: result.id,
          title: data.title, 
          editor: editor.data().name, 
          length: data.length, 
          thumbnail: "", 
          preview: "", 
          tags: data.tags
        }
        this.videos.push(video);
        if(index === size) {
          this.videos = this.shuffle(this.videos);
        }
        index++;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .videoWrapper {
      @apply .flex .flex-wrap .justify-center;
      top: 850px;
    }

</style>
