<template>
  <video :poster="poster" id="player" controls playsinline>
    <source
      v-for="option in options"
      v-bind:key="option.size"
      v-bind:src="option.src"
      type="video/mp4"
      v-bind:size="option.size"
    />
    <track
      v-for="caption in captions"
      v-bind:key="caption.label"
      kind="captions"
      v-bind:label="caption.label"
      v-bind:srclang="caption.srclang"
      v-bind:src="caption.src"
    />
  </video>
</template>

<script>
import Plyr from "plyr";

export default {
  mounted() {
    // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
    this.player = new Plyr("#player", {
      debug: true,
      previewThumbnails: {
        enabled: true,
        src: this.thumbnails
      },
      controls: [
          'play-large', // The large play button in the center
          'restart', // Restart playback
          'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          'fast-forward', // Fast forward by the seek time (default 10 seconds)
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          'pip', // Picture-in-picture (currently Safari only)
          'airplay', // Airplay (currently Safari only)
          'fullscreen', // Toggle fullscreen
      ],
      volume: 0.7
    });
  },
  data() {
    return {
      player: null
    };
  },
  props: {
    options: Array,
    captions: Array,
    thumbnails: Array,
    poster: String
  },
  watch: {
    options() {
      console.log(this.options);

      this.player.source = {
        type: 'video',
        title: '',
        sources: this.options,
        poster: this.poster,
        tracks: this.captions
      }

      setTimeout(
        function() {
        document.getElementsByClassName('plyr__volume')[0].hidden = false;
      }, 2000);

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
