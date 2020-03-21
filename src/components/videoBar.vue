<template>
  <div class="relative flex items-center justify-center align-center">
    <button
      v-if="horizontal"
      class="absolute left-0 z-10 w-8 h-8 mx-4 rounded-full shadow-lg fas fa-chevron-left navigation"
      @click="scroll(false)"
    ></button>
    <button
      v-if="horizontal"
      class="absolute right-0 z-10 w-8 h-8 rounded-full shadow-lg fas fa-chevron-right navigation"
      @click="scroll(true)"
    ></button>

    <button v-if="!horizontal" class="top-0 scrollButton fas fa-chevron-up" @click="scroll(false)"></button>
    <button v-if="!horizontal" class="bottom-0 scrollButton fas fa-chevron-down" @click="scroll(true)"></button>

    <div
      :class="[{hRecommendations: horizontal},{'vRecommendations': !horizontal }]"
      id="suggested"
      v-touch:swipe="handleSwipe"
    >
      <div class="videoRecommendation" v-for="video in videos" v-bind:key="video.title">
        <router-link draggable="false" to="/channel/" class="thumbnailWrapper">
          <div
            class="thumbnail"
            :style="{backgroundImage: `url(${require(`../assets/${video.thumbnail}`)})`}"
          ></div>
        </router-link>

        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <div class="videoTitle">{{video.title}}</div>
            <div class="videoChannel">Kazumoe</div>
          </div>
          <div class="flex flex-col">
            <div class="videoViews">2k Views</div>
            <div class="videoStatus">hot</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  props: {
    horizontal: Boolean // true horizontal and false vertical
  },
  data: function () {
    return {
      pixelPerElementV: 149.5,
      pixelPerElementH: 232,
      itemsPerScroll: 4,
      tweenDuriation: 600,

      videos: [
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' },
        { title: 'Versteckspiel', thumbnail: 'thumbnail.png' }
      ]
    }
  },
  computed: {
    scrollHorizontalAmount () {
      return this.pixelPerElementH * this.itemsPerScroll
    },
    scrollVerticalAmount () {
      return this.pixelPerElementV * this.itemsPerScroll
    }
  },
  methods: {
    handleSwipe (scrollDirection) {
      switch (scrollDirection) {
        case 'top':
          this.scroll(true)
          break
        case 'bottom':
          this.scroll(false)
          break
        case 'left':
          this.scroll(false)
          break
        case 'right':
          this.scroll(true)
          break
      }
    },
    scroll (scrollDirection) {
      // false = left and true = right
      if (this.horizontal) {
        if (scrollDirection) {
          this.tween(
            document.getElementById('suggested').scrollLeft,
            document.getElementById('suggested').scrollLeft +
              this.scrollHorizontalAmount,
            this.horizontal
          )
        } else {
          this.tween(
            document.getElementById('suggested').scrollLeft,
            document.getElementById('suggested').scrollLeft -
              this.scrollHorizontalAmount,
            this.horizontal
          )
        }
      } else {
        if (scrollDirection) {
          this.tween(
            document.getElementById('suggested').scrollTop,
            document.getElementById('suggested').scrollTop +
              this.scrollVerticalAmount,
            this.horizontal
          )
        } else {
          this.tween(
            document.getElementById('suggested').scrollTop,
            document.getElementById('suggested').scrollTop -
              this.scrollVerticalAmount,
            this.horizontal
          )
        }
      }
    },
    tween (start, end, horizontal) {
      let frameHandler

      const animate = function (currentTime) {
        TWEEN.update(currentTime)
        frameHandler = requestAnimationFrame(animate)
      }

      const myTween = new TWEEN.Tween({ tweeningValue: start })
        .to({ tweeningValue: end }, this.tweenDuration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .onUpdate(function (object) {
          if (horizontal) {
            document.getElementById('suggested').scrollLeft =
              object.tweeningValue
          } else {
            document.getElementById('suggested').scrollTop =
              object.tweeningValue
          }
        })
        .onComplete(() => {
          cancelAnimationFrame(frameHandler)
        })
        .start()

      frameHandler = requestAnimationFrame(animate)
    }
  }
}
</script>

<style lang="scss" scoped>
.hRecommendations {
  @apply flex flex-row overflow-hidden w-full;
}

.vRecommendations {
  @apply flex flex-col overflow-hidden;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-5px);
  }
  100% {
    transform: translatey(0px);
  }
}

.thumbnail {
  display: block;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 123.5px;
  width: 220px;

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  transform: scale(1.01);
}

.thumbnail:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.thumbnailWrapper {
  @apply .self-center;
  height: 123.5px;
  width: 220px;
  overflow: hidden;

  transition: all 500ms ease-in-out;
}

.videoRecommendation {
  @apply flex flex-col justify-center mr-3;
  max-width: 220px;
}

.videoTitle {
  @apply flex pt-2 text-sm font-bold  justify-start;
}

.videoChannel {
  @apply flex text-sm  justify-start;
}

.videoViews {
  @apply flex pt-2 text-sm  justify-start;
}

.videoStatus {
  @apply flex uppercase text-sm  justify-start;
}

.scrollButton {
  @apply absolute mx-4 z-10  rounded-full shadow-lg w-8 h-8;
  transition: all 0.2s ease-in-out;
  margin: 0;
}

.scrollButton:hover {
  animation: float 2s ease-in-out infinite;
}
</style>
