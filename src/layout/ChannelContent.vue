<template>
  <div class="container mx-auto flex mt-3 text-sm leading-normal">
    <div class="w-96 pr-6 mt-16 mb-4 ml-3 bg-white rounded-sm px-4 py-2 shadow-md">
      <div class="container mx-auto flex items-center">
        
        <h1 class="text-2xl font-bold">
          <a href="#" class="text-black tracking-wide">Kazumoe</a>
        </h1>

        <div class="flex float-right px-2 justify-end items-center">
          <div class="pr-2">
            <button
              class="bg-black hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-lg"
            >Follow</button>
          </div>
        </div>
      </div>

      <div class="mb-2 text-lg">
        <a href="#" class="text-darker lowercase">@kazumoe</a>
      </div>

      <hr class="mb-4">

      <div class="mb-2">
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
            target="_blank"
            rel="noopener noreferrer"
            class="text-black text-sm"
          >
            <img :src="faviconService + entry.baseurl" class="h-4 w-4">
            {{ entry.name }}
          </a>
        </li>
      </ul>
    </div>

    <div class="w-3/4 px-4">
      <div class="w-full px-4 bg-white shadow-md mb-4">
        <div class="font-bold ml-3 text-xl tracking-wide">Uploads</div>
        <div class="flex content-start flex-wrap">
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
          <div class="videoEntry relative">
            <img src="@/assets/thumbnail.png" alt="thumbnail" class="thumbnail">
            <div class="videoTitle">Beautiful Crime</div>
            <div class="videoEditor">by Kazumoe</div>
            <div class="absolute pin-t pin-r mt-3 mr-3 px-2 bg-black text-white text-xs">4:22</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
hr {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
}

.thumbnail {
  @apply .rounded-sm;
  object-fit: cover;
  width: 210px;
  height: 118px;
}

.videoTitle {
  @apply font-bold text-lg;
}

.videoEditor {
  @apply font-thin;
}

.videoInfo {
}

.videoEntry {
  @apply .px-2 .py-2 .flex .flex-col;
  height: auto;
}
</style>
