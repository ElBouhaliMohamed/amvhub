<template>
    <div class="flex items-center justify-center rounded-sm align-center">
      <CoolLightBox
        :items="images"
        :index="index"
        @close="index = null">
      </CoolLightBox>

      <img class="block h-auto cursor-pointer object-container max-h-64" @click="index = 0" :src="images[0]"/>
    </div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox
  },
  data () {
    return {
      index: null
    }
  },
  props: {
    images: Array
  }
}
</script>
