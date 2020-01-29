<template>
  <div class="flex flex-col bg-white py-4 sm:px-4 md:px-32">
    <div class="flex flex-row pb-8">
      <div class="flex flex-col w-3/4 mx-auto bg-white">
        <div class="w-full">
          <video-player :thumbnails="thumbnails" :poster="poster" :options="options" :captions="captions"></video-player>
        </div>

        <div class="w-full">
          <div class="flex flex-row text-start text-3xl font-lg my-4">
            <span class="flex w-1/2">
              {{title}}
            </span>
            <div class="flex w-1/2 justify-end flex-wrap mr-2 mt-2 p-2 text-sm"> 
              <span v-for="tag in tags" class="ml-2"> {{ tag }} </span>
            </div>
          </div>

          <div class="flex flex-row text-lg items-center mb-4">
            <div class="w-1/4 flex items-center">
              <!-- <img src="@/assets/avatar.jpg" alt="avatar" class="avatar"> -->
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
                <button @click="giveHeart" class="hover px-2 rounded-full">
                  <span class="fa fa-heart" v-bind:class="{'text-red-600': alreadyGaveHeart}"></span>
                  {{hearts}}
                </button>
              </div>

              <!-- <div class="pl-6">
                <button class="hover px-2 rounded-full" @click="openRatingModal()">
                  <span class="fas fa-poll mr-1"></span>
                  <span class="text-sm font-light">9,3</span>
                  <span class="text-sm font-light">/</span>
                  <span class="text-sm font-light">10</span>
                </button>
              </div> -->
            </div>
          </div>

          <!-- <div
            class="flex flex-wrap"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitMagni molestiae nam architecto quia amet minus et praesentium enim facilis culpa voluptates perferendis laboriosam temporibus, aliquid natus ea rem neque tempore adipisci ab iusto quibusdam nostrum nemo! Quibusdam quis incidunt corrupti consectetur aliquid pariatur eveniet expedita possimus harum unde quisquam ipsum voluptatibus sed inventore laudantium neque, tempore ducimus ad quam optio nam magnam consequaturConsequatur deserunt doloremque accusantium asperioresInventore recusandae consequuntur aut obcaecati, nihil enim eveniet labore, amet totam fugit, delectus eaque ipsam impedit esse quiAssumenda cumque, eligendi, quaerat consectetur velit id placeat dolorum inventore illum perferendis rem nisi?</div> -->

          <!-- <div class="flex flex-col flex-wrap">
            <div class="flex">
              <div class="fas fa-music mr-1"></div>
              <span v-for="(song, index) in songs"><span v-if="index > 0">, </span>{{song.artist}} - {{song.title}}</span>
            </div>
            <div>
              <div class="fas fa-tv mr-1"></div>
               <span v-for="(anime, index) in animes"><span v-if="index > 0">, </span> <a :href="'https://myanimelist.net/search/all?q=' + anime.replace(/\s/g, '%20')"> {{anime}} </a></span>
            </div>
          </div> -->

          <!-- <div class="flex flex-wrap">
            <router-link
              :to="'/search/tag/' + tag"
              class= mr-2 mt-2 p-2 rounded-full text-sm"
              v-for="tag in tags"
            >{{ tag }}</router-link>
          </div> -->
        </div>

        <!-- <videoBar class="pt-6" :horizontal="true"/> -->
      </div>
    </div>

    <comment-section :comments="comments" :videoRef="videoRef"/>
  </div>
</template>

<script>
import videoPlayer from '../components/videoPlayer.vue'
import videoBar from '../components/videoBar.vue'
import ratingModal from '../components/modals/rating.vue'
import { DOMAIN_TITLE } from '../.env'

import {mapState} from 'vuex';

import firebase from 'firebase'

export default {
  name: 'VideoPage',
  components: {
    videoPlayer,
    videoBar,
    ratingModal,
    commentSection: () => ({
      component: import('../components/CommentSection.vue'),
      loading: {
        template: '<div>...loading</div>'
      },
      error: {
        template: '<div>...error</div>'
      },
      delay: 100,
      timeout: 2000
    })
  },
  async mounted() {
    this.$Progress.start();
    var listRef = firebase.storage().ref(`videos/${this.videoId}/`);
    let res = await listRef.listAll();
    let options = [];
    if(res) {
      for(let item of res.items) {
        let metadata = await item.getMetadata()
        if(metadata) {
          let url = await firebase.storage().ref(metadata.fullPath).getDownloadURL();
          let name = metadata.name.split('-');

          options.push({
            src: url,
            type: metadata.contentType,
            size: parseInt(name[name.length - 1].split('.')[0]),
          })
        }
      }
    };

    let videoQueryRef = firebase.firestore().doc(`videos/${this.videoId}/`);
    let videoQuery = await videoQueryRef.get();
    let data = videoQuery.data();
    let user = await data.user.get();
    let video = {
      title: data.title, 
      user: user.data().name, 
      tags: data.tags,
      editor: data.editor
    }

    this.options = options;
    this.title = data.title;
    this.author = data.editor;
    this.tags = data.tags;

    if(data.views == undefined || data.views == null) {
      videoQueryRef.update({
        views: 1
      })
    }else {
      data.views++;
      videoQueryRef.update({
        views: data.views
      })
    }

    if(data.hearts == undefined || data.hearts == null) {
      videoQueryRef.update({
        hearts: 0
      })
    }

    if(data.usersThatGaveHearts == undefined || data.usersThatGaveHearts == null) {
      videoQueryRef.update({
        usersThatGaveHearts: []
      })
    }
    
    videoQueryRef.onSnapshot((doc) => {
        let data = doc.data();
        this.views = data.views;
        this.hearts = data.hearts;
        this.usersThatGaveHearts = data.usersThatGaveHearts;
        this.comments = data.comments;

        if(this.isLoggedIn) {
          let uid = this.$store.state.user.currentUser.currentUser.uid
          if(this.usersThatGaveHearts.includes(uid)) { // already voted
            this.alreadyGaveHeart = true;
          }
        }
    });

    this.videoRef = videoQueryRef;
    this.$Progress.finish();
  },
  methods: {
    ratingClosed() {
      this.showRatingModal = false;
      console.log("rating closed");
    },
    openRatingModal() {
      this.showRatingModal = true;
    },
    giveHeart() {
      if(this.isLoggedIn) {
        let uid = this.$store.state.user.currentUser.currentUser.uid
        if(this.usersThatGaveHearts.includes(uid)) { // already voted
          let index = this.usersThatGaveHearts.findIndex((element) => {
            return element ===  uid
          });
          this.usersThatGaveHearts.splice(index,1);
          this.hearts--;
          this.videoRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = false;
        }else { // not voted yet
          this.usersThatGaveHearts.push(uid);
          this.hearts++;
          this.videoRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = true;
        }
      }else {
        // not logged in
        console.log("not logged in");
        this.showErrorMsg();
      }
    }
  },
  title () {
    return DOMAIN_TITLE;
  },
  data: function () {
    return {
      showRatingModal:false,
      options: [],
      captions: [],
      thumbnails: [`https://amvhub.de/vtt/${this.$route.params.id}.vtt`],
      poster: `url(../assets/thumbnails/${this.uuid}.jpg)`, 
      title: '',
      author: '',
      uploadedAt: '',
      views: 0,
      hearts: 0,
      usersThatGaveHearts: [],
      tags: [],
      categories: [],
      songs: [
        // { artist: 'Somedude', title: 'Beautiful Crime' },
        // { artist: 'Somedude', title: 'Beautiful Crime' }
      ],
      animes: [],
      comments: [],
      videoRef: null,
      alreadyGaveHeart: false
    }
  },
  computed: {
    videoId () {
      return this.$route.params.id
    },
    isLoggedIn: function() {
      return this.$store.state.user.isLoggedIn;
    }
    // ...mapState('videoPage',['author', 'title', 'views', 'hearts', 'tags', 'categories'])
  },
  watch: {
    // isLoggedIn(isLoggedIn) {
    //   this.alreadyGaveHeart = isLoggedIn ? this.alreadyGaveHeart : false;
    // }
  },
  notifications: {
    showErrorMsg: {
      type: 'error',
      title: 'Error',
      message: 'You need to be logged in to be able to vote!'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/videoPlayer/settings/breakpoints";

</style>
