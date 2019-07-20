<template>
  <video :poster="poster" id="player" playinline controls>
    <source
      v-for="option in options"
      v-bind:key="option.size"
      v-bind:src="option.source"
      v-bind:type="option.type"
      v-bind:size="option.size"
    >
    <track
      v-for="caption in captions"
      v-bind:key="caption.label"
      kind="captions"
      v-bind:label="caption.label"
      v-bind:srclang="caption.srclang"
      v-bind:src="caption.src"
      default
    >
  </video>
</template>

<script>
import Plyr from 'plyr'

export default {
  mounted () {
  },
  data () {
    return {
      player: null
    }
  },
  props: {
    options: Array,
    captions: Array,
    poster: String
  },
  watch: {
    options() {
      this.player = new Plyr('#player', { 
        quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 960, 720, 576, 480, 360, 240] }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
