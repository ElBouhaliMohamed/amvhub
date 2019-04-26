<template>
  <div class="videoEntry">
    <a href="#" class="text-primary hover:text-teal">
      <div class="overflow-hidden">
        <div class="thumbnail">
        </div>
      </div>
    </a>

    <div class="videoTitle">{{title}}</div>
    <div class="videoLength">{{length}}</div>

    <div class="videoStatus">new</div>

    <!-- <img src="@/assets/avatar.jpg" alt="avatar" class="videoAvatar"> -->
    <a href="#" class="videoEditor">{{editor}}</a>

    <!-- <font-awesome-icon class="videoPlayCircle" size="lg" icon="play-circle-solid"/> -->
  </div>
</template>

<script>
export default {
  props: {
   title: String,
   editor: String,
   length: String,
   thumbnail: String
  },
  data: function() {
    return {
      thumbnailPath: '@/assets/' + this.thumbnail
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  background-image: url('../assets/thumbnail.png');
  display: block;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  width: 650px;
  height: 350px;

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}

.thumbnail:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.videoTitle {
  @apply .absolute .ml-16 .text-5xl .uppercase .text-primary;
  bottom: -20px;
}

.videoLength {
  @apply .absolute .pin-t .pin-r .mt-3 .mr-3 .px-2 .py-1 .text-secondary .text-xs .font-thin;
  background-color: rgba(0,0,0,0.4);
}

.videoStatus {
  @apply .absolute .pin-b .text-primary .font-bold .uppercase;
  bottom: -10px;
}

.videoEditor {
  @apply .absolute .ml-16 .font-thin .text-base .uppercase .text-primary;
  bottom: 30px;
}

.videoEntry {
  @apply .flex .relative .my-16;
}

.videoAvatar {
  @apply .absolute .w-16 .h-16 .rounded-lg;
  left: -25px;
  top: -25px;
}

.videoPlayCircle {
  @apply .absolute .text-primary;
  left: 200px;
  bottom: 115px;
}
</style>
