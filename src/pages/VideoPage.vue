<template>
  <div class="flex flex-col bg-background-100 pagePadding">
    <div class="flex flex-row pb-8">
      <div class="flex flex-col w-3/4 bg-background text-secondary-100">
        <div class="w-full">
          <video-player :poster="poster" :options="options" :captions="captions"></video-player>
        </div>

        <div class="w-full">
          <div class="text-start text-3xl font-lg my-4">{{title}}</div>

          <div class="flex flex-row text-lg items-center mb-4">
            <div class="w-1/4 flex font-bold items-center">
              <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
              {{author}}
            </div>

            <div class="w-3/4 flex flex-row justify-end items-center text-sm">
              <div class="pl-6">{{uploadedAt}}</div>
              <div class="pl-6">
                <div class="fa fa-eye"></div>
                {{views}}
              </div>

              <span class="fas fa-star fa-sm pl-6"></span>
              <div class="inline-block align-text-bottom">
                <span class="text-lg font-semibold">9,3/</span>
                <span class="text-sm font-light">10</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap"></div>

          <div
            class="flex flex-wrap"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni molestiae nam architecto quia amet minus et praesentium enim facilis culpa voluptates perferendis laboriosam temporibus, aliquid natus ea rem neque tempore adipisci ab iusto quibusdam nostrum nemo! Quibusdam quis incidunt corrupti consectetur aliquid pariatur eveniet expedita possimus harum unde quisquam ipsum voluptatibus sed inventore laudantium neque, tempore ducimus ad quam optio nam magnam consequatur. Consequatur deserunt doloremque accusantium asperiores. Inventore recusandae consequuntur aut obcaecati, nihil enim eveniet labore, amet totam fugit, delectus eaque ipsam impedit esse qui. Assumenda cumque, eligendi, quaerat consectetur velit id placeat dolorum inventore illum perferendis rem nisi?</div>

          <div class="flex flex-col flex-wrap">
            <div>
              <div class="fas fa-music"></div>Tamer - Beautiful Crime
            </div>
            <div>
              <div class="fas fa-tv"></div>Monster
            </div>
          </div>

          <div class="flex flex-wrap">
            <router-link
              :to="'/search/tag/' + tag"
              class="bg-secondary-50 text-background-100 mr-2 mt-2 p-1 rounded-sm text-sm"
              v-for="tag in tags"
            >{{ tag }}</router-link>
          </div>
        </div>

        <videoBar class="pt-6" :horizontal="true"/>
      </div>
    </div>

    <div id="comments">
      <div class="flex flex-col">
        <div class="flex flex-row">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
          <textarea
            name="comment"
            class="w-full border-2"
            rows="10"
            placeholder="What are your thoughts?"
          ></textarea>
        </div>
        <div class="flex flex-row justify-end pt-2">
          <button
            class="bg-transparent hover:bg-primary-100 text-secondary-100 font-semibold hover:text-white mb-2 py-2 px-4 border border-primary-100 hover:border-transparent rounded uppercase"
          >Comment</button>
        </div>
      </div>

      <div id="commentsection" class="flex flex-col bg-background-25 p-2">
        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <span class="border-l-2 h-full mr-2 mt-2"></span>
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum sint temporibus error inventore minus in porro doloribus accusantium. Ipsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsam. Corporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <span class="border-l-2 h-full mr-2 mt-2"></span>
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint velit eveniet quos sit rem alias ad pariatur eaque laboriosam blanditiis.</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint velit eveniet quos sit rem alias ad pariatur eaque laboriosam blanditiis.</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="commentsection" class="flex flex-col bg-background-25 mt-1 p-2">
        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <span class="border-l-2 h-full mr-2 mt-2"></span>
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum sint temporibus error inventore minus in porro doloribus accusantium. Ipsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsam. Corporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <span class="border-l-2 h-full mr-2 mt-2"></span>
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint velit eveniet quos sit rem alias ad pariatur eaque laboriosam blanditiis.</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint velit eveniet quos sit rem alias ad pariatur eaque laboriosam blanditiis.</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="commentsection" class="flex flex-col bg-background-25 mt-1 p-2">
        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs text-secondary-25 pl-2" href>@Kazumoe</span>
              <span class="text-xs text-secondary-25 px-4">&#8226;</span>
              <span class="text-secondary-100 text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint velit eveniet quos sit rem alias ad pariatur eaque laboriosam blanditiis.</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-primary-25 p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      tags: [
        "Naruto",
        "Sakura",
        "Bestamv",
        "Kazu",
        "Indigo Team",
        "Naruto",
        "Sakura",
        "Bestamv",
        "Kazu",
        "Indigo Team",
        "Naruto",
        "Sakura",
        "Bestamv",
        "Kazu",
        "Indigo Team",
        "Naruto",
        "Sakura",
        "Bestamv",
        "Kazu",
        "Indigo Team"
      ],
      categories: ["Action", "Drama"],
      songs: [
        { Artist: "Somedude", Song: "Beautiful Crime" },
        { Artist: "Somedude", Song: "Beautiful Crime" }
      ],
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
