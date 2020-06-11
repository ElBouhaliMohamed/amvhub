<template>
  <div class="block">
    <!-- <div class="absolute w-full background-gradient">
        <trending-carousel />
    </div> -->
    <!-- <div class="container grid justify-center w-full grid-cols-1 row-gap-20 col-gap-4 mx-auto mt-4 mb-20 md:row-gap-20 md:grid-cols-2"> -->
    <masonry class="w-full p-4 mx-auto mb-20 md:w-3/4" :cols="{default: 2, 768: 1}" :gutter="15">
      <video-entry class="my-4" v-for="video in videos" :key="video.uuid" :uuid="video.uuid" :title="video.title" :user="video.user" :length="video.length" :thumbnail="video.thumbnail" :preview="video.preview" :tags="video.categorys"></video-entry>
    </masonry>
    <!-- </div> -->
  </div>
</template>

<script>
import videoEntry from '../components/videoEntry.vue'
import trendingCarousel from '../components/trendingCarousel.vue'
import { firestore } from '../services/firebase.service'

export default {
  name: 'Trending',
  mounted () {
    this.fetchVideos()
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
    shuffle (array) {
      return array.sort(() => Math.random() - 0.5)
    },
    async fetchVideos () {
      let videosQuery = await firestore.collection('videos').get()
      let size = videosQuery.size
      let index = 1
      videosQuery.forEach(async (result) => {
        let data = result.data()
        let user = await data.user.get()
        let thumbnailsRef = await firestore.doc(`thumbnails/${result.id}/`)
        let thumbnailsQuery = await thumbnailsRef.get()
        let thumbnails = thumbnailsQuery.data()
        let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

        let video = {
          uuid: result.id,
          title: data.title,
          user: user.data(),
          length: data.length,
          thumbnail: currThumbnail,
          preview: data.preview,
          categorys: data.categorys
        }
        this.videos.push(video)
        if (index === size) {
          this.videos = this.shuffle(this.videos)
        }
        index++
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
