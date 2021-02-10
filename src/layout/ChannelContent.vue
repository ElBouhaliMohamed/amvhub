<template>
  <div class="flex flex-col text-sm leading-normal sm:flex-row">
    <div class="w-full px-4 text-white bg-gray-800 rounded-b-lg shadow-md sm:2/6 md:w-2/6 py-1/12 md:py-1/8 xl:py-1/12">
      <div class="container flex flex-col mx-auto md:flex-row">
        <h1 class="text-2xl font-bold">
          <a href="#" class="tracking-wide text-platinum">Kazumoe</a>
        </h1>

        <!-- <div class="flex items-center justify-end float-right px-2">
          <div class="pr-2">
            <button
              class="btn-primary"
            >FOLLOW</button>
          </div>
        </div> -->
      </div>

      <div class="mb-2">
        <a href="#" class="font-extralight lowercase text-platinum">@kazumoe</a>
      </div>

      <hr class="mb-4">

      <div class="mb-2 text-platinum">
        <span>Member of Dreambox</span>
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
            class="flex text-sm font-extralight text-platinum"
          >
            <img :src="faviconService + entry.baseurl" class="w-4 h-4">
            <span class="ml-2">{{ entry.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="w-full">
      <div class="px-4 mb-4">
        <!-- <div class="px-2 mx-8 mt-8 text-3xl font-medium tracking-wide text-white uppercase">Uploads</div> -->
        <div class="flex flex-wrap content-start">
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

export default {
  name: 'ChannelContent',
  data: function () {
    return {
      urls: [
        {
          url: 'youtube.com/TheBeautifulCrap',
          baseurl: 'youtube.com',
          name: 'Youtube Channel'
        },
        {
          url: 'bilibili.com',
          baseurl: 'bilibili.com',
          name: 'Bilibli Channel'
        }
      ],
      faviconService: 'http://localhost:8082/'
    }
  },
  components: {
    videoEntry: () => ({
      component: import('../components/videoEntry.vue')
    })
  }
}
</script>

<style lang="scss" scoped>
hr {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
}

</style>
