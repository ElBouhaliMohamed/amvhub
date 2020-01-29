<template>
  <div class="background-gradient text-white">
    <div class="container mx-auto md:w-3/4 lg:w-1/2 flex flex-col">
      <div class="flex flex-row feed-entry">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <!-- <span class="border-l-2 h-full mr-2 mt-2"></span> -->
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-start items-center text-center">
            <a class="text-sm font-bold" href>Kazumoe</a>
            <span class="text-xs opacity-75 font-hairline pl-2" href>@Kazumoe</span>
            <span class="text-xs opacity-25 font-hairline px-2">&#8226;</span>
            <span class="text-xs opacity-75 font-hairline">8 hours ago</span>
          </div>

          <div class="flex text-sm text-base font-thin">
            Test Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum sint temporibus error inventore minus in porro doloribus accusantium. Ipsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsam. Corporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?
          </div>

          <div class="flex flex-row pt-2 items-center">
            <button class="flex btn-xs btn-action mr-1">
              <span class="fas fa-heart mr-1"></span>
              <span class="mr-1 text-xs">6</span>
            </button>

            <button class="flex btn-xs btn-action mr-1 p-2">
              <span class="mr-1 text-xs">2</span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="flex btn-xs btn-action p-2">
              <span class="fas fa-retweet mx-1"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col feed-entry">
        <span class="text-sm">
          <span class="fas fa-retweet"></span>
          Arrow shared
        </span>
        <div class="flex">
          <div
            class="thumbnail"
            :style="{backgroundImage: `url(${require(`../assets/thumbnail.png`)})`}"
          ></div>
          <div class="flex flex-col">
            <span class="px-4 font-bold text-2xl">Beautiful Crime</span>
            <span class="flex flex-col md:flex-row px-4 font-thin text-xs">
              <span>Kazumoe</span>
              <span class="px-2 hidden md:block">&#8226;</span>
              <span>688 views</span>
              <span class="px-2 hidden md:block">&#8226;</span>
              <span>4 Months ago</span>
            </span>
            <span
              class="px-4 py-2 font-thin text-sm hidden md:block"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, totam in? Magni dignissimos eveniet autem, corporis rerum est quas porro officia numquam non voluptatibus, doloribus aliquid esse voluptatum a odit.</span>
          </div>
        </div>
        <span
          class="py-2 font-thin text-sm block md:hidden"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, totam in? Magni dignissimos eveniet autem, corporis rerum est quas porro officia numquam non voluptatibus, doloribus aliquid esse voluptatum a odit.</span>
      </div>
      <div class="flex flex-row feed-entry">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <!-- <span class="border-l-2 h-full mr-2 mt-2"></span> -->
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-start items-center text-center">
            <a class="text-sm" href>Kazumoe</a>
            <span class="text-xs pl-2" href>@Kazumoe</span>
            <span class="text-xs px-4">&#8226;</span>
            <span class="text-sm font-thin">8 hours ago</span>
          </div>

          <div class="flex flex-col">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            <div class="flex flex-row bg-gray-700 rounded-lg mt-2 px-4 py-2">
              <span class="flex flex-col items-center">
                <img src="@/assets/avatar.jpg" alt="avatar" class="smallAvatar" />
                <!-- <span class="border-l-2 h-full mr-2 mt-2"></span> -->
              </span>

              <div class="flex flex-col w-full">
                <div class="flex flex-col md:flex-row justify-start">
                  <a class="flex text-sm" href>Kazumoe
                    <span class="text-xs pl-2" href>@Kazumoe</span>
                  </a>
                  <span class="text-xs px-4 hidden md:block">&#8226;</span>
                  <span class="text-sm font-thin">8 hours ago</span>
                </div>

                <div
                  class="flex"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum sint temporibus error inventore minus in porro doloribus accusantium. Ipsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsam. Corporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>
              </div>
            </div>
          </div>

          <div class="flex flex-row pt-2 items-center">
            <button class="rounded-full hover p-2">
              <span class="px-1">6</span>
              <span class="fas fa-heart"></span>
            </button>

            <button class="rounded-full hover p-2">
              <span class="px-1">2</span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="rounded-full hover p-2">
              <span class="fas fa-retweet"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col feed-entry">
        <div class="flex">
          <div
            class="thumbnail"
            :style="{backgroundImage: `url(${require(`../assets/thumbnail.png`)})`}"
          ></div>
          <div class="flex flex-col">
            <span class="px-4 font-bold text-2xl">Beautiful Crime</span>
            <span class="flex flex-col md:flex-row px-4 font-thin text-xs">
              <span>Kazumoe</span>
              <span class="px-2 hidden md:block">&#8226;</span>
              <span>688 views</span>
              <span class="px-2 hidden md:block">&#8226;</span>
              <span>4 Months ago</span>
            </span>
            <span
              class="px-4 py-2 font-thin text-sm hidden md:block"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, totam in? Magni dignissimos eveniet autem, corporis rerum est quas porro officia numquam non voluptatibus, doloribus aliquid esse voluptatum a odit.</span>
          </div>
        </div>
        <span
          class="py-2 font-thin text-sm block md:hidden"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, totam in? Magni dignissimos eveniet autem, corporis rerum est quas porro officia numquam non voluptatibus, doloribus aliquid esse voluptatum a odit.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  data: function () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.feed-entry {
  @apply .bg-gray-700 .rounded-lg .px-2 .py-2 .my-2;
}

.avatar {
  @apply .h-16 .w-auto .mr-2 .rounded-full;
}
.smallAvatar {
  @apply .h-10 .w-auto .mr-2 .rounded-full;
}

.thumbnail {
  @apply .relative .inline-block .text-center .bg-cover .w-40 .h-24 .flex-shrink-0;
}

@screen md {
  .thumbnail {
    @apply .w-64 .h-40;
  }
}
</style>
