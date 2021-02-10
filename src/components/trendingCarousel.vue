<template>
  <div class="w-full">
      <carousel
        :per-page="perPage"
        :autoplay="autoplay"
        :autoplayHoverPause="autoplayHoverPause"
        :autoPlayTimeout="autoPlayTimeout"
        :loop="loop"
        :paginationColor="paginationColor"
        :paginationActiveColor="paginationActiveColor"
        :centerMode="centerMode"
        class=""
      >
        <slide>
          <div class="relative pb-3/6  text-white">
            <div class="absolute h-full w-full gradient-to-transparent">
              <img src="@/assets/thumbnail.png" class="h-full w-full object-cover blur-full small-scale">
            </div>
            <div class="absolute w-full flex py-28 px-16">
              <div class="w-1/2 shadow-md">
                <img src="@/assets/thumbnail.png" class="h-full w-full object-cover">
              </div>
              <div class="flex flex-col w-1/2 items-start self-end">
                <span class="flex flex-row">
                  <button class="btn btn-primary">Play</button>
                  <button class="bton btn-primary">More Info</button>
                </span>
                <span class="text-3xl font-bold">
                  Watch now:
                  "Beautiful Crime" by Kazumoe
                </span>
                <span class="text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ullam quia velit ipsum tempore eum, exercitationem explicabo dolore quis deserunt qui asperiores iure veritatis, blanditiis id aperiam ipsa consectetur hic aliquid iusto nisi, vitae accusantium neque! Minus alias laboriosam facere!
                </span>
              </div>
            </div>
            <!-- <button class="absolute bottom-0 mb-16 ml-16 btn">Play</button> -->
          </div>
        </slide>
      </carousel>
  </div>
</template>

<script>
export default {
  props: {},
  data: function () {
    return {
      perPage: 1,
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      centerMode: true,
      autoPlayTimeout: 8000,
      paginationColor: '#000000',
      paginationActiveColor: '#efefef',
      poster: 'thumbnail.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  @apply absolute z-10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.bannerTitle {
  @apply absolute font-extralight .text-5xl z-10;
}
</style>
