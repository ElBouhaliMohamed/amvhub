<template>
  <video controls preload="auto" ref="videoPlayer" class="flex items-center justify-center video-js vjs-sublime-skin"></video>
</template>

<script>
import videojs from 'video.js' // :class=" {TheaterMode: theaterMode}"
import 'videojs-sprite-thumbnails'

export default {
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  mounted () {
    this.prepareVideoPlayer()
  },
  data () {
    return {
      player: null
    }
  },
  computed: {
    theaterMode: {
      get () {
        return this.$store.getters['videoPage/theaterMode']
      },
      set (newVal) {
        this.$store.commit('videoPage/SET_THEATERMODE', newVal)
      }
    }
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    captions: Array,
    spriteSheet: {
      type: Object,
      default () {
        return {}
      }
    },
    poster: String
  },
  methods: {
    prepareVideoPlayer () {
      this.player = videojs(this.$refs.videoPlayer, {
        responsive: true,
        fluid: true,
        controlBar: {
          children: [
            'playToggle',
            'currentTimeDisplay',
            'progressControl',
            'remainingTimeDisplay',
            'volumePanel',
            'fullscreenToggle'
          ]
        }
      })

      var Button = videojs.getComponent('Button')
      let self = this
      var theaterButton = videojs.extend(Button, {
        constructor: function () {
          Button.apply(this, arguments)
          this.addClass('vjs-control')
          this.addClass('vjs-button')
          this.addClass('vjs-theaterMode-control')
          this.addClass('fas')
          this.addClass('fa-film')
          this.controlText('Theater Mode')
        },
        handleClick: function () {
          console.log('Theater Mode')
          if (!self.player.isFullscreen()) {
            self.$emit('theaterMode')
            // use queryselector to find the child video element
            var videoElement = self.player.el().querySelector('video')
            // if one is found, we're using html5 tech, so add a custom class
            if (videoElement) {
              if (videoElement.classList.contains('vjs-maxScreen')) {
                videoElement.classList.remove('vjs-maxScreen')
              } else {
                videoElement.classList.add('vjs-maxScreen')
              }
            }
          }
        }
      })
  
      this.player.on('fullscreenchange', () => {
        if (self.player.isFullscreen()) {
          var videoElement = self.player.el().querySelector('video')
          videoElement.classList.remove('vjs-maxScreen')

          // var videoPlayerElement = self.player.el()
          // videoPlayerElement.classList.add('flex', 'justify-center', 'items-center')

          if (self.theaterMode) {
            self.$emit('theaterMode')
          }
        }
      })

      videojs.registerComponent('theaterButton', theaterButton)
      this.player.getChild('controlBar').addChild('theaterButton', {}, 5)

      this.player.on('firstplay', () => {
        console.log('firstplay')
        self.$emit('firstplay')
      })
    }
  },
  watch: {
    options () {
      this.player.src(this.options.sources)
      console.log(this.spriteSheet)
      // this.player.vttThumbnails({
      //   src: this.spriteSheet
      // })
      console.log(this.player)
    },
    poster (newValue) {
      this.player.poster(newValue)
    },
    spriteSheet (newValue) {
      this.player.spriteThumbnails({
        interval: 5,
        url: newValue.spriteSheet,
        width: newValue.spriteDimensions.width,
        height: newValue.spriteDimensions.height,
        responsive: 1024
      })
    }
  }
}
</script>

<style lang="scss" scoped>

/* Make the video relative, instead of absolute, so that
   the parent container will size based on the video. Also,
   note the max-height rule. Note the line-height 0 is to prevent
   a small artifact on the bottom of the video.
 */
.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3,
video.video-js,
video.vjs-tech, {
  position: relative !important;
  width: 100%;
  height: auto !important;
  max-width: 100% !important;
  padding-top: 0 !important;
  line-height: 0;
}

/* For theater mode */
video.vjs-tech.vjs-maxScreen {
  max-height: calc(100vh - 235px);
}

/* Fix the control bar due to us resetting the line-height on the video-js */
.vjs-control-bar {
  line-height: 1;
}

</style>
