<template>
  <div class="container mx-auto flex text-sm leading-normal">
    <div class="w-96 px-4 py-20 bg-white shadow-md">
      <div class="container mx-auto flex items-center">
        <h1 class="text-2xl font-bold">
          <a href="#" class="text-platinum tracking-wide">Kazumoe</a>
        </h1>

        <div class="flex float-right px-2 justify-end items-center">
          <div class="pr-2">
            <button
              class="bg-black text-white py-2 px-4 rounded-lg"
            >FOLLOW</button>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <a href="#" class="lowercase font-thin text-platinum">@kazumoe</a>
      </div>

      <hr class="mb-4">

      <div class="mb-2 text-platinum">
        <span>Member of Indigo Team</span>
        <br>
        <br>
        <span>you can hit me up at twitter @iamkazumoe or discord Kazumoe#3232</span>
        <br>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi enim et sapiente voluptatibus natus esse iusto, impedit corporis eligendi cupiditate?</span>
      </div>
      <hr class="mb-4">
      <ul>
        <li v-for="entry in urls" :key="entry.url">
          <a
            :href="'//' + entry.url"
            class="text-platinum text-sm font-thin"
          >
            <img :src="faviconService + entry.baseurl" class="h-4 w-4">
            {{ entry.name }}
          </a>
        </li>
      </ul>
    </div>

    <div class="w-full">
      <div class="px-4 mb-4">
        <div class="px-2 mx-8 mt-8 font-medium text-3xl text-white uppercase tracking-wide">Uploads</div>
        <div class="flex content-start flex-wrap">
          <video-entry title="Versteckspiel" editor="Kazumoe" length="4:20" thumbnail="thumbnail2.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail6.jpg"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail5.jpg"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png"></video-entry>
          <video-entry title="Beautiful Crime" editor="Kazumoe" length="4:20" thumbnail="thumbnail.png"></video-entry>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import videoEntry from "../components/videoEntry.vue";

export default {
  name: "ChannelContent",
  data: function() {
    return {
      urls: [
        {
          url: "youtube.com/TheBeautifulCrap",
          baseurl: "youtube.com",
          name: "Youtube Channel"
        },
        {
          url: "bilibili.com",
          baseurl: "bilibili.com",
          name: "Bilibli Channel"
        }
      ],
      faviconService: "http://localhost:8082/"
    };
  },
  components: {
    videoEntry
  }
};
</script>

<style lang="scss" scoped>
hr {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
}

</style>
