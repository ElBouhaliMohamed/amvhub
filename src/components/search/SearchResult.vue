<template>
  <ul>
        <feedEntry :showUser="true" :userUuid="result.user.raw.uuid" :userName="result.user.raw.name" :videoUuid="result.uuid.raw" :thumbnail="thumbnail" :title="result.title.raw" :date="[new Date().toISOString(), new Date().toGMTString()]" :views="10" :description="result.description.raw" />
    <!-- {{ result }} -->
  </ul>
</template>

<script>
import { getThumbnail } from './../../services/videos.service'

export default {
  components: {
    feedEntry: () => ({
      component: import('./../feedEntry')
    })
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      thumbnail: ''
    }
  },
  async mounted () {
    this.thumbnail = await getThumbnail(this.result.uuid.raw)
  },
  methods: {
    // imageSrc(id) {
    //   return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`;
    // }
  }
}
</script>

<style scoped>

</style>
