<template>
  <div data-aos="fade-up" data-aos-once="true" class="videoEntry">
    <router-link :to="this.url" class=" w-full">
      <div class="thumbnailWrapper">
        <!-- <div class="fa fa-5x fa-play-circle videoPlayCircle"></div> -->
        <div
          :id="preview"
          class="thumbnail small md:large"
          :style="{backgroundImage: `url(${require(`../assets/thumbnails/${this.uuid}.jpg`)})`}"
          @mouseenter="showPreview()"
          @mouseleave="hidePreview()"
        ></div>
      </div>
    </router-link>

    <!-- <div class="videoLengthBackground"></div>
    <div class="videoLength">{{lengthInMinutes}}</div> -->
    <div class="videoInfoBackground"></div>

    <div class="videoInfoWrapper">
      <router-link to="#" class="videoEditor">{{editor}}</router-link>
      <span class="videoTitle">{{title}}</span>
    </div>

    <div class="videoStatus">
      <span class="flex" v-for="tag in tags" :key="tag">
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
    editor: String,
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
      previewUrl: `/videos/${this.preview}`,
      previewLoaded: false,
      previewVideo: Object,
      hovering: false
    }
  },
  computed: {
    lengthInMinutes () {
      return parseFloat(this.length / 60).toFixed(2)
    },
    isLightMode () {
      return !this.$store.getters['theme/isDarkMode']
    }
  },
  methods: {
    loadVideo () {
      // this.$Progress.start();
      let routeData = this.$router.resolve(this.url);
      window.open(routeData.href, '_blank');
    },
    videoFullyBuffered () {
      console.log('I think I can play thru the entire ' + ' video without ever having to stop to buffer.')
      this.previewLoaded = true
      if (this.hovering) {
        let thumbnail = document.getElementById(this.preview)
        thumbnail.appendChild(this.previewVideo)
        this.previewVideo.play().catch(err => { console.log(err) })
      }
    },
    showPreview () {
      this.hovering = true
      if (this.preview.length > 0 && !this.previewLoaded) {
        this.previewVideo = document.createElement('video')
        this.previewVideo.classList.add('container', 'mx-auto', 'opacity-100')
        this.previewVideo.id = `${this.preview}`
        this.previewVideo.src = `${this.previewUrl}`
        this.previewVideo.autoplay = true
        this.previewVideo.controls = false
        this.previewVideo.volume = 0.3
        this.previewVideo.loop = false
        this.previewVideo.oncanplaythrough = this.videoFullyBuffered()
      } else if (this.previewLoaded && this.previewVideo) {
        console.log('The Video is already fully loaded.')
        this.previewVideo.hidden = false
        this.previewVideo.play().catch(err => { console.log(err) })
      }
    },
    hidePreview () {
      this.hovering = false
      if (this.preview.length > 0) {
        this.previewVideo.hidden = true
        this.previewVideo.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  display: block;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  height: 220px;

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  transform: scale(1.01);
}

.large {
  width: 620px;
  height: 320px;
}

.mid {
  width: 100%;
  height: 420px;
}

.thumbnail:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.thumbnailWrapper {
  @apply .inline-block .overflow-hidden;
  width: 100%;
  text-align: center;
  vertical-align: middle;

  mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
}

.videoPlayCircle {
  @apply .z-10 .opacity-100;
  transform: translate(40%,40%);
}

.videoInfoWrapper {
  @apply .absolute .ml-20 .flex .flex-col text-black;
  bottom: -27px;
}

.videoTitle {
  @apply .text-3xl .uppercase .leading-tight;
}

.videoEditor {
  @apply .font-thin .text-base .uppercase;
}

.videoLength {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-3 .px-2 .py-1 .text-xs;
}

.videoLengthBackground {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-4 .py-2 .px-2 .h-5 .w-8 .opacity-25 .rounded-sm;
}

.videoStatus {
  @apply .absolute .bottom-0 .font-bold .text-xs .uppercase text-black;
  bottom: -20px;
}

.videoInfoBackground {
  @apply .absolute .bottom-0 .h-20 .opacity-25 w-full;
}

.videoEntry {
  @apply .text-white .flex .relative .my-8 .mx-2 .w-full;
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

  .videoTitle {
     @apply .text-4xl;
  }

}

@screen xll {
  .videoEntry {
    width: auto;
  }

  .thumbnail {
    @apply large;
  }

  .videoInfoWrapper {
    @apply .ml-28
  }

  .videoTitle {
    @apply .text-5xl;
  }

  .videoStatus {
    @apply .text-lg;
    bottom: -18px;
  }

  .videoInfoBackground {
    @apply h-16;
    width: 620px;
  }
}

</style>
