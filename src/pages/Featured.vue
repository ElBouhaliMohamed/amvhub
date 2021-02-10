<template>
  <div class="block">
    <masonry class="p-4 mx-auto mb-20 md:w-3/4" :cols="3" :gutter="{default: '15px', 768: '5'}">
      <video-entry class="my-4" v-for="video in videos" :key="video.uuid" :uuid="video.uuid" :title="video.title" :user="video.user" :length="video.length" :thumbnail="video.poster" :isPoster="true"></video-entry>
    </masonry>
  </div>
</template>

<script>
import { getDocument, getDocumentFromRef, getDocuments, getReference, retrieveURL } from '../services/firebase.functions.service'

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
    videoEntry: () => ({
      component: import('../components/videoEntry.vue')
    })
  },
  methods: {
    async fetchVideos () {
      let videosQuery = await getDocuments('featured')

      videosQuery.forEach(async (result) => {
        let data = result.data()
        let user = await getDocumentFromRef(data.user)
        let hasPoster = data.hasPoster
        let poster = null
        let thumbnail = null
        
        if (hasPoster) {
          let posterRef = getReference(`poster/${result.id}/poster_${result.id}`)
          let posterUrl = await retrieveURL(posterRef)
          poster = posterUrl
        } else {
          let thumbnailsQuery = await getDocument('thumbnails', result.id)
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
