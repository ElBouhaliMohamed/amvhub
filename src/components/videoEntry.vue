<template>
  <div data-aos="fade-up" data-aos-once="true" class="videoEntry">
    <router-link :to="url" class="text-secondary-100 w-full">
      <div class="thumbnailWrapper">
        <!-- <div class="fa fa-5x fa-play-circle videoPlayCircle"></div> -->
        <div
          class="thumbnail small md:large"
          :style="{backgroundImage: `url(${require(`../assets/${this.thumbnail}`)})`}"
        ></div>
      </div>
    </router-link>

    <div class="videoLengthBackground"></div>
    <div class="videoLength">{{length}}</div>
    <!-- <div class="videoInfoBackground"></div> -->

    <div class="videoInfoWrapper">
      <router-link to="#" class="videoEditor">{{editor}}</router-link>
      <span class="videoTitle">{{title}}</span>
    </div>

    <div class="videoStatus">{{status}}</div>
    <!-- <img src="@/assets/avatar.jpg" alt="avatar" class="videoAvatar"> -->
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    editor: String,
    length: String,
    thumbnail: String,
    status: String
  },
  data: function() {
    return {
      url: `/video/${this.title.trim()}`
    };
  }
};
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
  height: 220px;
}

.mid {
  width: 550px;
  height: 250px;
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
}

.videoPlayCircle {
  @apply .text-secondary-100 .z-10 .opacity-100;
  transform: translate(40%,40%);
}

.videoInfoWrapper {
  @apply .absolute .ml-10 .flex .flex-col;
  bottom: -27px;
}

.videoTitle {
  @apply .text-3xl .uppercase .text-secondary-100 .leading-tight;
}

.videoEditor {
  @apply .font-thin .text-base .uppercase .text-secondary-100;
}

.videoLength {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-3 .px-2 .py-1 .text-secondary-100 .text-xs;
}

.videoLengthBackground {
  @apply .absolute .top-0 .right-0 .mt-3 .mr-4 .h-5 .w-8 .bg-background-100 .opacity-25;
}

.videoStatus {
  @apply .absolute .bottom-0 .font-bold .text-xs .uppercase .text-secondary-100;
  bottom: -20px;
}

.videoInfoBackground {
  @apply .absolute .bottom-0 .h-16 .bg-background-100 .opacity-25;
  width: 320px;
}

.videoEntry {
  @apply .flex .relative .my-8 .mx-2 .w-full;
}

.videoAvatar {
  @apply .absolute .w-16 .h-16 .rounded-lg;
  left: -25px;
  top: -25px;
}

.videoPlayCircle {
  @apply .absolute .text-secondary-100;
  left: 200px;
  bottom: 115px;
}

@screen md {
  .videoEntry {
    @apply .flex-shrink;
  }

  // .thumbnail {
  //   @apply mid;
  // }

  .videoTitle {
     @apply .text-4xl;
  }
}

@screen lg {
  .videoEntry {
    width: auto;
  }

  .thumbnail {
    @apply large;
  }

  .videoInfoWrapper {
    @apply .ml-16
  }

  .videoTitle {
    @apply .text-5xl;
  }

  .videoStatus {
    @apply .text-lg;
    bottom: -18px;
  }
}

</style>
