<template>
  <div class="bg-white" :class="{'lg:pt-4': !theaterMode}">
    <headful
      :title="`${editors} - ${title} | amvhub`"
    />
    <div class="flex justify-center" :class="[{'flex-col lg:flex-row': !theaterMode, 'flex-col': theaterMode}]">
      <div :class="[{'max-w-screen-lg w-full lg:w-2/4': !theaterMode, 'w-full': theaterMode}]">
          <video-player id="video-player" v-on:theaterMode="toggleTheaterMode" v-bind:options.sync="options" v-bind:spriteSheet.sync="spriteSheet" v-bind:poster.sync="poster"></video-player>
          <div class="flex flex-wrap justify-center">
            <div class="px-4" :class="[{'w-full': !theaterMode, 'max-w-screen-lg w-3/4': theaterMode}]">
              <span class="flex flex-row justify-start max-w-screen-lg my-4 text-3xl font-bold text-start font-lg">
                  {{title}}
              </span>

              <!-- <div class="flex my-4">
                <img class="w-1/4 h-auto cursor-pointer" :class="{'w-auto' : watchThumbnail}" src="@/assets/thumbnail2.png" @click="watchThumbnail = !watchThumbnail" />
              </div> -->

              <div class="flex flex-row items-center justify-center max-w-screen-lg mb-4 text-lg">
                <div class="flex items-center w-1/2">
                  <user-infos parent="authorAvatar" :visible="showUserInfos"/>
                  <img id="authorAvatar" @mouseenter="showUserInfos = true" @mouseout="showUserInfos = false" src="@/assets/avatar2.png" class="w-16 h-16 mr-2 rounded-full cursor-pointer" />
                  <span class="text-lg font-bold">
                    {{user.name}}
                  </span>
                </div>

                <div class="flex flex-row items-center justify-end w-1/2 text-sm">

                  <ratingModal :show="showRatingModal" :closeCallback="ratingClosed"></ratingModal>
                  
                  <div class="pl-6">
                    <span class="fa fa-eye"></span>
                    {{views}}
                  </div>

                  <div class="pl-6">
                    <button @click="giveHeart" class="px-2 rounded-full hover">
                      <span class="fa fa-heart" v-bind:class="{'text-red-600': alreadyGaveHeart}"></span>
                      {{hearts}}
                    </button>
                  </div>

                  <div class="pl-6">
                    <button class="px-2 rounded-full hover">
                      <span class="text-yellow-400 fa fa-star"></span>
                      7.9 <span class="text-xs font-thin">/ 10 (60 Votes)</span>
                    </button>
                  </div>

                </div>
              </div>

              <div class="flex flex-wrap font-light leading-7">
                {{description}}
              </div>

              <!-- <div class="flex flex-col flex-wrap">
                <div class="flex">
                  <div class="mr-1 fas fa-music"></div>
                </div>
                <div>
                  <div class="mr-1 fas fa-tv"></div>
                    <span v-for="(anime, index) in animes"><span v-if="index > 0">, </span> <a :href="'https://myanimelist.net/search/all?q=' + anime.replace(/\s/g, '%20')"> {{anime}} </a></span>
                </div>
              </div>

              <div class="flex flex-wrap">
                <router-link
                  :to="'/search/tag/' + tag"
                  class="p-2 mt-2 mr-2 text-sm rounded-full"
                  v-for="tag in tags" :key="tag"
                >{{ tag }}</router-link>
              </div> -->

              <div class="py-4">
                <div class="pt-5 mt-5 border-t border-gray-200">
                  <dl>
                    <div class=" sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-tv"></span>
                        Sources
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <span v-for="(source, index) in sources" v-bind:key="index"><span v-if="index > 0">, </span> <a :href="'https://myanimelist.net/search/all?q=' + source.title.replace(/\s/g, '%20')"> {{source.title}} </a></span>

                      </dd>
                    </div>
                    <div class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-music"></span>
                        Songs
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <span v-for="(song, index) in songs"><span v-if="index > 0">, </span>{{song.artist}} - {{song.title}}</span>
                      </dd>
                    </div>
                    <div class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-users"></span>
                        Editors
                      </dt>
                      <dd class="flex flex-row mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <span class="flex items-center justify-start mr-2" v-for="(editor, index) in editors" v-bind:key="index">
                          <img src="@/assets/avatar2.png" class="w-16 h-auto pr-2" />
                          <span class="text-lg font-bold">
                            {{editor}}
                          </span>
                        </span>
                      </dd>
                    </div>
                    <div class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-paperclip"></span>
                        Downloads
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul class="border border-gray-200 rounded-md">
                          <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm leading-5">
                            <div class="flex items-center flex-1 w-0">
                              <span class="flex-1 w-0 ml-2 truncate">
                                1920x1080@25fps
                              </span>
                            </div>
                            <div class="flex-shrink-0 ml-4">
                              <a href="#" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <comment-section :comments="comments" :videoRef="videoRef"/>
            </div>
            <div class="w-1/4 my-6">
              <div class="relative" :class="{'hidden': !theaterMode}">
                <videoBar class="absolute left-0" :horizontal="false"/>
              </div>
            </div>
          </div>
      </div>
      <span class="relative w-1/4" :class="{'hidden': theaterMode}">
        <videoBar class="absolute left-0" :horizontal="false"/>
      </span>
    </div>
  </div>
</template>

<script>
import videoPlayer from '../components/videoPlayer.vue'
import videoBar from '../components/videoBar.vue'
import ratingModal from '../components/modals/rating.vue'
import userInfos from '../components/modals/UserInformation.vue'
import { DOMAIN_TITLE } from '../.env'

import firebase from 'firebase'

export default {
  name: 'VideoPage',
  components: {
    videoPlayer,
    videoBar,
    ratingModal,
    userInfos,
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
  beforeDestroy () {
    this.$store.commit('videoPage/SET_THEATERMODE', false)
  },
  async mounted () {
    this.$Progress.start()
    var listRef = firebase.storage().ref(`videos/${this.videoId}/`)
    let res = await listRef.listAll()
    let options = {
      autoplay: true,
      controls: true,
      sources: []
    }
    if (res) {
      for (let item of res.items) {
        let metadata = await item.getMetadata()
        if (metadata) {
          let url = await firebase.storage().ref(metadata.fullPath).getDownloadURL()
          let name = metadata.name.split('-')

          options.sources.push({
            src: url,
            type: metadata.contentType
          })
        }
      }
    };

    let videoQueryRef = firebase.firestore().doc(`videos/${this.videoId}/`)
    let videoQuery = await videoQueryRef.get()
    let data = videoQuery.data()
    let user = await data.user.get()

    // Object.assign(this.options, options)
    this.options = options
    this.title = data.title
    this.editors = data.editors
    this.tags = data.tags
    this.categories = data.categories
    this.description = data.description
    this.songs = data.songs
    this.sources = data.sources
    this.createdAt = Date.parse(data.createdAt)
    this.creationDate = Date.parse(data.creationDate)
    this.user = user.data()

    console.log(data)

    let thumbnailsRef = await firebase.firestore().doc(`thumbnails/${this.videoId}/`)
    let thumbnailsQuery = await thumbnailsRef.get()
    let thumbnails = thumbnailsQuery.data()
    let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

    this.spriteDimensions = {
      width: data.spriteWidth,
      height: data.spriteHeight
    }
    this.spriteSheet = {
      spriteSheet: data.spriteSheet,
      spriteDimensions: this.spriteDimensions
    }

    this.poster = currThumbnail
    this.$emit('update:spriteSheet', this.spriteSheet)
    this.$emit('update:poster', currThumbnail)

    if (data.views === undefined || data.views == null) {
      videoQueryRef.update({
        views: 1
      })
    } else {
      data.views++
      videoQueryRef.update({
        views: data.views
      })
    }

    if (data.hearts === undefined || data.hearts == null) {
      videoQueryRef.update({
        hearts: 0
      })
    }

    if (data.usersThatGaveHearts === undefined || data.usersThatGaveHearts == null) {
      videoQueryRef.update({
        usersThatGaveHearts: []
      })
    }
    
    videoQueryRef.onSnapshot((doc) => {
      let data = doc.data()
      this.views = data.views
      this.hearts = data.hearts
      this.usersThatGaveHearts = data.usersThatGaveHearts
      this.comments = data.comments

      if (this.isLoggedIn) {
        let uid = this.$store.state.user.currentUser.currentUser.uid
        if (this.usersThatGaveHearts.includes(uid)) { // already voted
          this.alreadyGaveHeart = true
        }
      }
    })

    this.videoRef = videoQueryRef
    this.$Progress.finish()
  },
  methods: {
    toggleTheaterMode () {
      this.theaterMode = !this.theaterMode
      this.$store.commit('videoPage/SET_THEATERMODE', this.theaterMode)
    },
    ratingClosed () {
      this.showRatingModal = false
      console.log('rating closed')
    },
    openRatingModal () {
      this.showRatingModal = true
    },
    giveHeart () {
      if (this.isLoggedIn) {
        let uid = this.$store.state.user.currentUser.currentUser.uid
        if (this.usersThatGaveHearts.includes(uid)) { // already voted
          let index = this.usersThatGaveHearts.findIndex((element) => {
            return element === uid
          })
          this.usersThatGaveHearts.splice(index, 1)
          this.hearts--
          this.videoRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = false
        } else { // not voted yet
          this.usersThatGaveHearts.push(uid)
          this.hearts++
          this.videoRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = true
        }
      } else {
        // not logged in
        console.log('not logged in')
        this.showErrorMsg()
      }
    }
  },
  title () {
    return DOMAIN_TITLE
  },
  data: function () {
    return {
      showRatingModal: false,
      options: {},
      captions: [],
      spriteSheet: {
        type: Object,
        default () {
          return {}
        }
      },
      spriteDimensions: {},
      poster: ``,
      title: '',
      description: '',
      editors: [],
      tags: [],
      categories: [],
      songs: [
        { artist: 'Tamer', title: 'Beautiful Crime' },
        { artist: 'Somedude', title: 'Some Song' }
      ],
      sources: [],
      createdAt: Date,
      creationDate: Date,
      views: 0,
      hearts: 0,
      usersThatGaveHearts: [],
      comments: [],
      videoRef: null,
      alreadyGaveHeart: false,
      theaterMode: false,
      watchThumbnail: false,
      showUserInfos: false,
      user: Object
    }
  },
  computed: {
    videoId () {
      return this.$route.params.id
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
    aspectRatio: function () {
      return this.$store.getters['videoPage/aspectRatio']
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
</style>
