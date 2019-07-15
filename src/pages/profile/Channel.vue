<template>
  <div class="">
      <AppBanner></AppBanner>
      <AppProfilebar></AppProfilebar>
      <AppChannelContent></AppChannelContent>
  </div>
</template>

<script>
import AppChannelContent from '../../layout/ChannelContent.vue'
import AppBanner from '../../components/banner.vue'
import AppProfilebar from '../../components/profilebar.vue'

export default {
  name: 'IndexPage',

  components: {
    AppBanner,
    AppProfilebar,
    AppChannelContent
  },

  data () {
    return {
    
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
