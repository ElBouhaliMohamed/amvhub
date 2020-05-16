<template>
  <div data-aos="fade-up" data-aos-once="true" class="relative flex w-full text-white">
    <div class="w-full">
      <div class="relative aspect-ratio-16/9" @mouseenter="showPreview()" @mouseleave="hidePreview()">
        <router-link :id="preview" :to="this.url">
          <img :src="thumbnail" class="absolute object-cover w-full h-full thumbnailWrapper"/>
        </router-link>
        <transition >
          <button @click="mute" class="absolute top-0 right-0 z-20 transition-all duration-500 ease-in-out transform scale-100 opacity-0 group hover:scale-125" :class="{'opacity-100':isPlaying}">
            <span class="absolute w-8 h-8 bg-white rounded-full opacity-50 top-3 right-3 group-hover:opacity-100"/>
            <span class="absolute w-8 h-8 text-center text-gray-900 rounded-full top-4 right-3">
              <i v-if="isMuted" class="fas fa-volume-mute"></i>
              <i v-else class="fas fa-volume-up"></i>
            </span>
          </button>
        </transition>
      </div>
    </div>

    <!-- <div class="videoLengthBackground"></div>
    <div class="videoLength">{{lengthInMinutes}}</div> -->
    <!-- <div class="videoInfoBackground"></div> -->

    <div class="absolute bottom-0 left-0 z-30 w-full transition-all duration-300 ease-out transform opacity-0 h-36 bg-gray-50" :class="{'translate-y-36 opacity-100': isPlaying}"></div>

    <div class="absolute bottom-0 left-0 z-30 flex flex-col w-3/4 text-black transition-all duration-300 ease-in-out transform" :class="{'translate-y-16': isPlaying}">
      <router-link :to="`/channel/${user.uuid}`" class="text-base font-thin leading-none uppercase">{{user.name}}</router-link>
      <span class="inline-block text-3xl leading-none uppercase truncate align-text-bottom md:text-4xl lg:text-5xl">{{title}}</span>
    </div>

    <div class="absolute bottom-0 right-0 z-30 flex flex-col w-1/4 transition-all duration-300 ease-in-out transform " :class="{'translate-y-36': isPlaying}">
      <span class="inline-block font-bold text-right text-black uppercase align-text-top lg:text-lg" v-for="tag in tags" :key="tag">
      {{tag}}
      </span>
    </div>
    <!-- <img src="@/assets/avatar.jpg" alt="avatar" class="videoAvatar"> -->
  </div>
</template>

<script>
export default {
  props: {
    uuid: String,
    title: String,
    user: Object,
    length: String,
    thumbnail: String,
    tags: Array,
    preview: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      url: `/video/${this.uuid.trim()}`,
      previewUrl: `${this.preview}`,
      previewLoaded: false,
      previewVideo: Object,
      hovering: false,
      isPlaying: false
    }
  },
  computed: {
    lengthInMinutes () {
      return parseFloat(this.length / 60).toFixed(2)
    },
    isLightMode () {
      return !this.$store.getters['theme/isDarkMode']
    },
    isMuted: {
      get () {
        return this.$store.getters['trending/isMuted']
      },
      set (val) {
        this.$store.commit('trending/toggleMute', val)
      }
    }
  },
  watch: {
    isMuted (newVal) {
      this.previewVideo.muted = newVal
    }
  },
  methods: {
    mute () {
      this.isMuted = !this.isMuted
    },
    loadVideo () {
      // this.$Progress.start();
      let routeData = this.$router.resolve(this.url)
      window.open(routeData.href, '_blank')
    },
    videoFullyBuffered () {
      console.log('I think I can play thru the entire ' + ' video without ever having to stop to buffer.')
      this.previewLoaded = true
      this.previewVideo.muted = this.isMuted
      this.previewVideo.volume = 0.3
      let thumbnail = document.getElementById(this.preview)
      thumbnail.appendChild(this.previewVideo)

      if (this.hovering) {
        this.isPlaying = true
        this.previewVideo.play().then(() => {
          this.previewVideo.classList.remove('opacity-0')
          this.previewVideo.classList.add('opacity-100')
        }).catch(err => { console.log(err) })
      }
    },
    showPreview () {
      this.hovering = true
      if (this.preview.length > 0 && !this.previewLoaded) {
        this.previewVideo = document.createElement('video')
        this.previewVideo.classList.add('absolute', 'object-cover', 'w-full', 'h-full', 'opacity-0', 'transition', 'duration-500')
        this.previewVideo.id = `${this.preview}`
        this.previewVideo.src = `${this.previewUrl}`
        this.previewVideo.autoplay = true
        this.previewVideo.controls = false
        this.previewVideo.loop = true
        this.previewVideo.muted = true
        this.previewVideo.oncanplaythrough = this.videoFullyBuffered()
      } else if (this.previewLoaded && this.previewVideo) {
        console.log('The Video is already fully loaded.')
        this.previewVideo.classList.remove('opacity-0')
        this.previewVideo.classList.add('opacity-100')
        this.previewVideo.play().catch(err => { console.log(err) })
        this.isPlaying = true
      }
    },
    hidePreview () {
      this.hovering = false
      if (this.preview.length > 0) {
        this.isPlaying = false
        this.previewVideo.classList.remove('opacity-100')
        this.previewVideo.classList.add('opacity-0')
        this.previewVideo.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnailWrapper {
    -webkit-mask-image: linear-gradient(to top, transparent 5%, black 95%);
    mask-image: linear-gradient(to top, transparent 5%, black 95%)
}

.large {
  width: 620px;
  height: 320px;
}

.mid {
  width: 100%;
  height: 420px;
}

.videoPlayCircle {
  @apply .z-10 .opacity-100;
  transform: translate(40%,40%);
}

.videoInfoWrapper {
  bottom: -40px;
}

.videoLength {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-3 .px-2 .py-1 .text-xs;
}

.videoLengthBackground {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-4 .py-2 .px-2 .h-5 .w-8 .opacity-25 .rounded-sm;
}

.videoInfoBackground {
  @apply .absolute .bottom-0 .h-20 .opacity-25 .bg-gray-50 .w-full;
}

.videoAvatar {
  @apply .absolute .w-16 .h-16 .rounded-lg;
  left: -25px;
  top: -25px;
}

.videoPlayCircle {
  @apply .absolute;
  left: 200px;
  bottom: 115px;
}

@keyframes fade {
  0%{
    opacity: 0 !important;
  }
  100% {
    opacity: 1 !important;
  }
}

.preview {
  animation: fade 2s linear;
}

@screen md {
  .videoEntry {
    @apply .flex-shrink;
  }

  .thumbnail {
    @apply mid;
  }

}

@screen xll {
  .videoEntry {
    width: auto;
  }

  .thumbnail {
    @apply large;
  }

  .videoInfoBackground {
    @apply h-16;
    width: 620px;
  }
}

</style>
