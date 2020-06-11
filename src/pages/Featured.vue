<template>
  <div class="block">
    <masonry class="p-4 mx-auto mb-20 md:w-3/4" :cols="3" :gutter="{default: '15px', 768: '5'}">
      <video-entry class="my-4" v-for="video in videos" :key="video.uuid" :uuid="video.uuid" :title="video.title" :user="video.user" :length="video.length" :thumbnail="video.poster" :isPoster="true"></video-entry>
    </masonry>
  </div>
</template>

<script>
import videoEntry from '../components/videoEntry.vue'
import { firestore, storage } from '../services/firebase.service'

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
    videoEntry
  },
  methods: {
    async fetchVideos () {
      let videosQuery = await firestore.collection('featured').get()

      videosQuery.forEach(async (result) => {
        let data = result.data()
        let user = await data.user.get()
        let hasPoster = data.hasPoster
        let poster = null
        let thumbnail = null
        
        if (hasPoster) {
          let posterRef = await storage.ref(`poster/${result.id}/poster_${result.id}`)
          let posterUrl = await posterRef.getDownloadURL()
          poster = posterUrl
        } else {
          let thumbnailsRef = await firestore.doc(`thumbnails/${result.id}/`)
          let thumbnailsQuery = await thumbnailsRef.get()
          let thumbnails = thumbnailsQuery.data()
          thumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]
        }

        let video = {
          editors: data.editors,
          title: data.title,
          uuid: data.uuid,
          views: data.views,
          user: user.data(),
          createdAt: data.createdAt,
          ranking: data.ranking,
          poster: hasPoster ? poster : thumbnail
        }
        this.videos.push(video)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
