<template>
  <div class="flex flex-col bg-white py-4 sm:px-4 md:px-32">
    <div class="flex flex-row pb-8">
      <div class="flex flex-col w-3/4 bg-white">
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

              <ratingModal :show="showRatingModal" :closeCallback="ratingClosed"></ratingModal>

              <div class="pl-6">{{uploadedAt}}</div>
              
              <div class="pl-6">
                <span class="fa fa-eye"></span>
                {{views}}
              </div>

              <div class="pl-6">
                <button class="hover:bg-background-light px-2 rounded-full">
                  <span class="fa fa-heart"></span>
                  {{hearts}}
                 </button>
              </div>

              <div class="pl-6">
                <button class="hover:bg-background-light px-2 rounded-full" @click="openRatingModal()">
                  <span class="fas fa-poll mr-1"></span>
                  <span class="text-sm font-light">9,3</span>
                  <span class="text-sm font-light">/</span>
                  <span class="text-sm font-light">10</span>
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitMagni molestiae nam architecto quia amet minus et praesentium enim facilis culpa voluptates perferendis laboriosam temporibus, aliquid natus ea rem neque tempore adipisci ab iusto quibusdam nostrum nemo! Quibusdam quis incidunt corrupti consectetur aliquid pariatur eveniet expedita possimus harum unde quisquam ipsum voluptatibus sed inventore laudantium neque, tempore ducimus ad quam optio nam magnam consequaturConsequatur deserunt doloremque accusantium asperioresInventore recusandae consequuntur aut obcaecati, nihil enim eveniet labore, amet totam fugit, delectus eaque ipsam impedit esse quiAssumenda cumque, eligendi, quaerat consectetur velit id placeat dolorum inventore illum perferendis rem nisi?</div>

          <div class="flex flex-col flex-wrap">
            <div class="flex">
              <div class="fas fa-music mr-1"></div>
              <span v-for="(song, index) in songs"><span v-if="index > 0">, </span>{{song.artist}} - {{song.title}}</span>
            </div>
            <div>
              <div class="fas fa-tv mr-1"></div>
               <span v-for="(anime, index) in animes"><span v-if="index > 0">, </span> <a :href="'https://myanimelist.net/search/all?q=' + anime.replace(/\s/g, '%20')"> {{anime}} </a></span>
            </div>
          </div>

          <div class="flex flex-wrap">
            <router-link
              :to="'/search/tag/' + tag"
              class="bg-background-dark text-background-100 mr-2 mt-2 p-2 rounded-full text-sm"
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
            placeholder=" What are your thoughts?"
          ></textarea>
        </div>
        <div class="flex flex-row justify-end pt-2">
          <button
            class="bg-transparent hover:bg-white hover:text-black font-semibold mb-2 py-2 px-4 border border-primary-100 hover:border-transparent rounded uppercase"
          >Comment</button>
        </div>
      </div>

      <div id="commentsection" class="flex flex-col bg-white-dark p-2">
        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <span class="border-l-2 h-full mr-2 mt-2"></span>
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs  pl-2" href>@Kazumoe</span>
              <span class="text-xs  px-4">&#8226;</span>
              <span class=" text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1">2</span>
                <span class="fas fa-comments"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="fas fa-retweet"></span>
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
              <span class="text-xs  pl-2" href>@Kazumoe</span>
              <span class="text-xs  px-4">&#8226;</span>
              <span class=" text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1">3</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1"></span>
                <span class="fas fa-comments"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="fas fa-retweet"></span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-row mb-2">
          <span class="flex flex-col items-center">
            <img src="@/assets/avatar.jpg" alt="avatar" class="avatar">
            <!-- <span class="border-l-2 h-full mr-2 mt-2"></span> -->
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>Kazumoe</a>
              <span class="text-xs  pl-2" href>@Kazumoe</span>
              <span class="text-xs  px-4">&#8226;</span>
              <span class=" text-sm font-thin">8 hours ago</span>
            </div>

            <div
              class="flex"
            >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

            <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1"></span>
                <span class="fas fa-comments"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="fas fa-retweet"></span>
              </button>
            </div>
          </div>
        </div>
      
      </div>

    </div>
  </div>
</template>

<script>
import videoPlayer from '../components/videoPlayer.vue'
import videoBar from '../components/videoBar.vue'
import ratingModal from '../components/modals/rating.vue'
import { DOMAIN_TITLE } from '../.env'

import firebase from 'firebase'

export default {
  name: 'VideoPage',
  components: {
    videoPlayer,
    videoBar,
    ratingModal
  },
  async beforeRouteEnter(to,from,next) {
    var listRef = firebase.storage().ref(`videos/${to.params.id}/`);
    let res = await listRef.listAll();
    let options = [];
    if(res) {
      for(let item of res.items) {
        let metadata = await item.getMetadata()
        if(metadata) {
          let url = await firebase.storage().ref(metadata.fullPath).getDownloadURL();

          options.push({
            source: url,
            type: metadata.contentType,
            size: parseInt(metadata.name.split('-')[1].split('.')[0]),
          })
        }
      }
    }
    next(vm => vm.setVideoOptions(options));
  },
  methods: {
    setVideoOptions(options) {
      this.options = options;
    },
    ratingClosed() {
      this.showRatingModal = false;
      console.log("rating closed");
    },
    openRatingModal() {
      this.showRatingModal = true;
    }
  },
  title () {
    return `${DOMAIN_TITLE} | ${this.title}`
  },
  data: function () {
    return {
      showRatingModal:false,
      options: [
        // {
        //   size: 1080,
        //   source: `/videos/dqw16qwd5qwh1b2d-960.mp4`,
        //   type: 'video/mp4'
        // },
        // {
        //   size: 1440,
        //   source: `/videos/dqw16qwd5qwh1b2d-1080.mp4`,
        //   type: 'video/mp4'
        // }
      ],
      captions: [],
      poster: '/thumbnails/dqw16qwd5qwh1b2d.png',
      title: 'Beautiful Crime',
      author: 'Kazumoe',
      uploadedAt: 'Januar 12, 2019',
      views: 612,
      hearts: 120,
      tags: [
        'Drama',
        'Action'
      ],
      categories: ['Action', 'Drama'],
      songs: [
        { artist: 'Somedude', title: 'Beautiful Crime' },
        { artist: 'Somedude', title: 'Beautiful Crime' }
      ],
      animes: ['Monster', 'Naruto Shippuuden']
    }
  },
  computed: {
    videoId () {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/videoPlayer/settings/breakpoints";

.avatar {
  @apply .h-10 .w-10 .mr-2 .rounded-lg;
}

</style>
