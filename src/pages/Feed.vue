<template>
  <div class="text-white bg-white">
    <div class="md:py-2 md:container md:mx-auto md:w-3/4 shadow overflow-hidden sm:rounded-md">
      <ul v-for="video in feed" v-bind:key="video.id">
        <li>
          <div class="block hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "> <!-- sm:border-b sm:border-gray-200 -->
            <div class="px-2 py-4">
              <div class="min-w-0 flex-1 flex flex-row md:flex-col">
                <div class="flex-shrink-0 group block focus:outline-none pl-4">
                  <div class="flex items-center">
                    <a href="#">
                      <img class="inline-block h-8 w-8 md:h-16 md:w-16 rounded-full" src="../assets/avatar.jpg" alt="avatar" />
                    </a>
                    <div class="ml-3 hidden md:block">
                      <p class="text-xl leading-5 font-bold text-gray-700 group-hover:text-gray-900">
                        {{video.editor}}
                      </p>
                      <a href="#" class="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-900 group-focus:underline transition ease-in-out duration-150">
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row md:pt-2">
                  <a href="#" class="flex-shrink-0 pl-4">
                      <img class="w-40 h-24 md:w-64 md:h-40 object-cover" src="../assets/thumbnail3.png">
                  </a>
                  <div class="min-w-0 flex flex-1 pl-4">
                      <div class="pt-1 flex md:block">
                        <div class="block w-3/5">
                          <span class="px-4 font-bold text-2xl text-gray-900 leading-5">
                            <a href="#">{{video.title}}</a>
                          </span>
                          <span class="flex flex-col md:flex-row px-4 font-thin text-sm leading-5 text-gray-500">
                            <a href="#" class="block md:hidden leading-5 font-medium truncate">{{video.editor}}</a>
                            <span>{{video.views}} views</span>
                            <span class="px-2 hidden md:block">&#8226;</span>
                            <time v-bind:datetime="video.date[0]">{{video.date[1]}}</time>
                          </span>
                        </div>
                        <p class="px-4 py-2 text-gray-900 font-thin text-sm truncate w-2/5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, totam in? Magni dignissimos eveniet autem, corporis rerum est quas porro officia numquam non voluptatibus, doloribus aliquid esse voluptatum a odit.
                        </p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="hidden container mx-auto md:w-3/4 lg:w-1/2 flex flex-col">
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
    return {
      feed: [
        {
          id: 1,
          editor: 'Kazumoe',
          title: 'Atonement',
          views: 301,
          date: ['2020-12-15', 'December 15, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          id: 2,
          editor: 'Kazumoe',
          title: 'Beautiful Crime',
          views: 602,
          date: ['2020-12-01', 'December 1, 2020'],
          avatar: '../assets/avatar.jpg'
        },
        {
          id: 3,
          editor: 'Kazumoe',
          title: 'Test video 3',
          views: 1100,
          date: ['2020-01-07', 'Januar 7, 2020'],
          avatar: '../assets/avatar.jpg'
        }
      ]
    }
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
