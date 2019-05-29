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
import Plyr from 'plyr';

export default {
  mounted() {
    this.player = new Plyr('#player');
    console.log(this.player);
  },
  data() {
    return {
      player: null,
    };
  },
  props: {
    options: Array,
    captions: Array,
    poster: String
  }
};
</script>

<style lang="scss" scoped>
</style>
