<template>
  <div class="flex flex-col bg-background-100 pagePadding">
    <div class="flex flex-row pb-8"> 
      <div class="flex flex-col w-3/4 bg-background text-secondary-100">
        <div class="w-full">
          <video-player :poster="poster" :options="options" :captions="captions"></video-player>
        </div>

        <div class="w-full">
          <div class="text-3xl font-bold mb-4">{{title}}</div>
          <div class="border-b-2 border-secondary-100 pt-1 mb-4 opacity-10"></div>

          <div class="flex flex-row text-lg items-center mb-4">
            <div class="w-1/2 flex font-bold items-center">
              <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
              {{author}}
            </div>

            <div class="w-1/2 flex flex-row justify-end text-sm">
              <div class>{{uploadedAt}}</div>
              <div class="pl-6">
                <div class="fa fa-eye"></div>
                {{views}}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <router-link :to="'/search/tag/' + tag" class="bg-secondary-50 text-background-100 mr-2 mt-2 p-2 rounded-full text-sm" v-for="tag in tags" v-bind:key="tag">
              {{ tag }}
            </router-link>
          </div>
        </div>
      </div>

    </div>

    <videoBar class="w-3/4" :horizontal="true" />

  </div>
</template>

<script>
import videoPlayer from "../components/videoPlayer.vue";
import videoBar from "../components/videoBar.vue";
import { DOMAIN_TITLE } from "../.env";

export default {
  name: "VideoPage",
  components: {
    videoPlayer,
    videoBar
  },
  title() {
    return `${DOMAIN_TITLE} | ${this.title}`;
  },
  data: function() {
    return {
      options: [
        {
          size: 1080,
          source: `/videos/dqw16qwd5qwh1b2d-960.mp4`,
          type: "video/mp4"
        },
        {
          size: 1440,
          source: `/videos/dqw16qwd5qwh1b2d-1080.mp4`,
          type: "video/mp4"
        }
      ],
      captions: [],
      poster: "/thumbnails/dqw16qwd5qwh1b2d.png",
      title: "Beautiful Crime",
      author: "Kazumoe",
      uploadedAt: "Januar 12, 2019",
      views: 612,
      tags: ["Naruto","Sakura","Bestamv","Kazu","Indigo Team", "Naruto","Sakura","Bestamv","Kazu","Indigo Team", "Naruto","Sakura","Bestamv","Kazu","Indigo Team", "Naruto","Sakura","Bestamv","Kazu","Indigo Team"],
      categories: ["Action","Drama"],
      songs: [ {Artist: "Somedude", Song: "Beautiful Crime"}, {Artist: "Somedude", Song: "Beautiful Crime"} ],
      animes: ["Monster"]
    };
  },
  computed: {
    videoId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/videoPlayer/settings/breakpoints";

.avatar {
  @apply .h-10 .w-10 .mr-2 .rounded-lg;
}

.pagePadding {
  @apply .py-4 .mx-32;
}
</style>
