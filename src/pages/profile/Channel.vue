<template>
  <div class="">
      <div class="relative pb-1/6">
        <img src="@/assets/banner.jpg" class="absolute h-full w-full object-cover">
      </div>
      <div class="container mx-auto flex items-center relative">
          <img src="@/assets/avatar.jpg" alt="avatar" class="absolute ml-6 w-16 h-16 sm:w-32 sm:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 rounded-full">
      </div>
      <!-- <div class="container mx-auto bg-white text-black">
          <ul class="flex">
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Videos </a></li>
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Following </a></li>
              <li class="text-center py-3 px-4"><a class="text-white" href="#" target="_blank" rel="noopener noreferrer"> Followers </a></li>
          </ul>
      </div> -->

      <app-channel-content/>

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
