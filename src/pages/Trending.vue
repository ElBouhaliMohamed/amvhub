<template>
  <div>
    <div class="">
        <trending-carousel />
    </div>
    <div class="container w-full lg:w-3/4 mx-auto videoWrapper">
        <video-entry title="Versteckspiel" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png" status="hot"></video-entry>
        <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png" status="hot"></video-entry>
        <video-entry title="Atonement" editor="Kazumoe" length="4:20" thumbnail="thumbnail3.png" status="hot"></video-entry>
        <video-entry title="Beautiful Crime2" editor="Kazumoe" length="4:20" thumbnail="thumbnail4.jpg" status="hot"></video-entry>
        <video-entry title="Versteckspiel2" editor="Kazumoe" length="4:20" thumbnail="thumbnail5.jpg" status="hot"></video-entry>
        <video-entry title="Beautiful Crime3" editor="Kazumoe" length="4:20" thumbnail="thumbnail6.jpg" status="hot"></video-entry>
        <video-entry title="Beautiful Crime4" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png" status="hot"></video-entry>
        <video-entry title="Beautiful Crime5" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png" status="hot"></video-entry>
        <video-entry title="Versteckspiel6" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png" status="hot"></video-entry>
        <video-entry title="Beautiful Crime7" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png" status="hot"></video-entry>
    </div>
  </div>
</template>

<script>
import videoEntry from '../components/videoEntry.vue';
import trendingCarousel from '../components/trendingCarousel.vue';

export default {
  name: "Trending",
  data: function() {
    return {
    };
  },
  components: {
      videoEntry,
      trendingCarousel
  },
};
</script>

<style lang="scss" scoped>
    .videoWrapper {
      @apply .flex .flex-wrap;
    }

</style>
