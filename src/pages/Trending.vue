<template>
  <div>
    <div class="">
        <trending-carousel />
    </div>
    <div class="container w-full lg:w-3/4 mx-auto videoWrapper">
        <video-entry v-for="video in videos" :key="video.uid" :uid="video.uid" :title="video.title" :editor="video.editor" :length="video.length" :thumbnail="video.thumbnail" :preview="video.preview" :status="video.status"></video-entry>
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
      videos: []
    }
  },
  components: {
    videoEntry,
    trendingCarousel
  },
  methods: {
    async fetchVideos() {
      let videosQuery = await firebase.firestore().collection("videos").get();
      videosQuery.forEach(async (result) => {
        let data = result.data();
        let editor = await data.user.get();
        let video = {
          uid: result.id,
          title: data.title, 
          editor: editor.data().name, 
          length: "4:20", 
          thumbnail: "thumbnail.png", 
          preview: "dqw16qwd5qwh1b2e-preview.mp4", 
          status: "test"
        }
        this.videos.push(video);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .videoWrapper {
      @apply .flex .flex-wrap .justify-center;
    }

</style>
