<template>
  <div class="">
      <div class="relative pb-1/6">
        <img src="@/assets/banner.jpg" class="absolute h-full w-full object-cover">
      </div>
      <div class="container mx-auto flex items-center relative">
          <img src="@/assets/avatar.jpg" alt="avatar" class="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full">

          <div class="w-full px-64">
              <ul class="flex">
                  <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Videos </a></li>
                  <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Following </a></li>
                  <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Followers </a></li>
              </ul>
          </div>
      </div>
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
