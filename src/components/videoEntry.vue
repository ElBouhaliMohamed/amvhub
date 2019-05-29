<template>
  <div data-aos="fade-up" data-aos-once="true" class="videoEntry">
    <router-link :to="url" class="text-secondary-100">
      <div class="thumbnailWrapper">
        <!-- <div class="fa fa-5x fa-play-circle videoPlayCircle"></div> -->
        <div
          class="thumbnail"
          :style="{backgroundImage: `url(${require(`../assets/${this.thumbnail}`)})`}"
        ></div>
      </div>
    </router-link>

    <div class="videoLengthBackground"></div>
    <div class="videoLength">{{length}}</div>
    <div class="videoInfoBackground"></div>

    <div class="videoTitle">{{title}}</div>

    <div class="videoStatus">{{status}}</div>

    <!-- <img src="@/assets/avatar.jpg" alt="avatar" class="videoAvatar"> -->
    <router-link to="#" class="videoEditor">{{editor}}</router-link>
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
  width: 550px;
  height: 250px;

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
  @apply .inline-block .overflow-hidden;
  text-align: center;
  vertical-align: middle;
}

.videoPlayCircle {
  @apply .text-secondary-100 .z-10 .opacity-100;
  transform: translate(40%,40%);
}

.videoTitle {
  @apply .absolute .ml-16 .text-5xl .uppercase .text-secondary-100;
  bottom: -20px;
}

.videoLength {
  @apply .absolute .pin-t .pin-r .mt-3 .mr-3 .px-2 .py-1 .text-secondary-100 .text-xs;
}

.videoLengthBackground {
  @apply .absolute .pin-t .pin-r .mt-3 .mr-4 .h-5 .w-8 .bg-background-100 .opacity-25;
}

.videoStatus {
  @apply .absolute .pin-b .font-bold .uppercase .text-secondary-100;
  bottom: -15px;
}

.videoInfoBackground {
  @apply .absolute .pin-b .h-16 .bg-background-100 .opacity-25;
  width: 550px;
}

.videoEditor {
  @apply .absolute .ml-16 .font-thin .text-base .uppercase .text-secondary-100;
  bottom: 30px;
}

.videoEntry {
  @apply .flex .relative .my-8;
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
</style>
