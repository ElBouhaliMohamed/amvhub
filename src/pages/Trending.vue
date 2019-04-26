<template>
     <div class="ml-auto mr-auto w-5/6 bg-secondary">
      <div class="flex flex-wrap content-between videoWrapper">
          <video-entry title="Versteckspiel" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Versteckspiel" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Versteckspiel" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail1.png"></video-entry>
      </div>
    </div>    
</template>

<script>
import skeletonBox from '../components/skeletonBox.vue';

const videoEntry = () => ({
  // The component to load (should be a Promise)
  component: import('../components/videoEntry.vue'),
  // A component to use while the async component is loading
  loading: skeletonBox,
  // Delay before showing the loading component. Default: 200ms.
  delay: 0,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})

export default {
  name: "Trending",
  data: function() {
    return {
    };
  },
    components: {
        videoEntry
    },
};
</script>

<style lang="scss" scoped>
    .videoWrapper {
        justify-content: space-evenly;
    }
</style>
