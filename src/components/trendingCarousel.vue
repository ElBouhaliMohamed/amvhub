<template>
  <carousel
    :per-page="perPage"
    :autoplay="autoplay"
    :autoplayHoverPause="autoplayHoverPause"
    :autoPlayTimeout="autoPlayTimeout"
    :loop="loop"
    :paginationColor="paginationColor"
    :paginationActiveColor="paginationActiveColor"
    :centerMode="centerMode"
  >
    <slide>
      <div class="bannerWrapper">
        <img src="@/assets/thumbnail.png" class="banner">
      </div>
    </slide>
  </carousel>
</template>

<script>
export default {
  props: {},
  data: function() {
    return {
      perPage: 1,
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      centerMode: true,
      autoPlayTimeout: 4000,
      paginationColor: "var(--secondary-color)",
      paginationActiveColor: "var(--primary-100)",
      poster: "thumbnail.png"
    };
  }
};
</script>

<style lang="scss" scoped>
.icon {
  @apply .absolute .text-secondary-100 z-10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.bannerWrapper {
  @apply relative .w-full .overflow-hidden .h-112;
}

.banner {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.bannerTitle {
  @apply .absolute .font-thin .text-5xl .text-secondary-100 z-10;
}
</style>
