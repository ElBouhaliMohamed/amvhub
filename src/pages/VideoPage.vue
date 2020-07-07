<template>
  <div class="bg-white" :class="{'lg:pt-4': !theaterMode}">
    <headful
      :title="`${editors.map(e => e.name).join(', ')} - ${title} | amvhub`"
    />
    <div class="flex justify-center" :class="[{'flex-col lg:flex-row': !theaterMode, 'flex-col': theaterMode}]">
      <div :class="[{'max-w-screen-lg w-full lg:w-2/4': !theaterMode, 'w-full': theaterMode}]">
          <video-player id="video-player" v-on:theaterMode="toggleTheaterMode" v-bind:options.sync="options" v-bind:spriteSheet.sync="spriteSheet" v-bind:poster.sync="thumbnail" @firstplay="markVideoAsWatched"></video-player>
          <div class="flex flex-wrap justify-center">
            <div class="px-4" :class="[{'w-full': !theaterMode, 'lg:max-w-screen-lg lg:w-3/4': theaterMode}]">
              <span class="flex flex-row justify-start max-w-screen-lg my-4 text-3xl font-semibold text-start font-lg" :class="{'skeleton-box h-8 w-48 rounded-md':loading}">
                  {{title}}
              </span>

              <div class="flex flex-row items-center justify-center max-w-screen-lg mb-4 text-lg" :class="{'skeleton-box h-12 w-full rounded-md':loading}">
                <div class="flex items-center w-1/2 align-center" :class="{'hidden':loading}">
                    <!-- <user-infos parent="authorAvatar" :visible="showUserInfos"/> -->
                    <img id="authorAvatar" @mouseenter="showUserInfos = true" @mouseout="showUserInfos = false" :src="user.photoURL" class="w-10 h-10 mr-2 rounded-full cursor-pointer" />
                    <router-link class="" :to="`/channel/${user.uuid}`">
                      <span class="text-lg font-semibold" :class="{'skeleton-box h-6 w-28 rounded-md':loading}">
                        {{user.name}}
                      </span>
                    </router-link>
                    <followButton v-slot:default="slotProps" v-if="isLoggedIn" class="hidden px-4 sm:block" :isLoggedIn="isLoggedIn" :userId="userId">
                      <span class="relative z-0 inline-flex shadow-sm">
                          <button :disabled="!isLoggedIn" @click="slotProps.follow" type="button"
                          class="relative inline-flex items-center px-4 py-2 leading-5 transition duration-150 ease-in-out"
                          :class="{'rounded-md text-gray-50 border border-transparent bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700':slotProps.followed,
                          'rounded-l-md text-gray-700 bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 disabled:cursor-not-allowed':!slotProps.followed}">
                            <svg class="w-5 h-5 mr-2 -ml-1" :class="{'hidden':slotProps.followed, 'text-gray-400':!slotProps.followed}" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                            </svg>
                            <span class="text-sm font-medium uppercase " v-if="!slotProps.followed">Follow</span>
                            <span class="text-sm font-medium uppercase " v-else>Unfollow</span>
                          </button>
                          <span class="relative inline-flex items-center px-3 py-2 -ml-px text-sm font-medium leading-5 transition duration-150 ease-in-out focus:z-10 focus:outline-none rounded-r-md"
                          :class="{'text-gray-700 bg-white border border-gray-300 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700':!slotProps.followed,
                          'hidden':slotProps.followed}"
                          > {{ slotProps.followersCount }} </span>
                      </span>
                    </followButton>
                </div>

                <div class="flex flex-row items-center justify-end w-1/2 text-sm" :class="{'hidden':loading}">
                  
                  <div class="pl-6">
                    <span class="fa fa-eye"></span>
                    <span :class="{'skeleton-box h-6 w-12':loading}"></span>
                    {{views}}
                  </div>

                  <div class="pl-6">
                    <button @click="giveHeart" class="px-2 rounded-full hover">
                      <span class="fa fa-heart" v-bind:class="{'text-red-600': alreadyGaveHeart}"></span>
                      <span :class="{'skeleton-box h-6 w-12':loading}"></span>
                      {{hearts}}
                    </button>
                  </div>

                  <div class="pl-6">
                    <button @click="openRatingModal" class="px-2 rounded-full hover">
                      <span class="text-yellow-400 fa fa-star"></span>
                      {{ratingsMedian}} <span class="text-xs font-thin">/ 10 (median of {{ratingsCount}} Votes)</span>
                    </button>
                  </div>

                  <ratingModal :videoRef="videoRef" :userId="userId" :show="showRatingModal" :closeCallback="ratingClosed"></ratingModal>

                </div>
              </div>

              <div class="flex flex-wrap font-light leading-7 sm:border-t sm:border-gray-200 sm:pt-5" :class="{'skeleton-box h-48 w-full rounded-md':loading}" v-html="description"></div>

              <div v-if="hasPoster" class="flex justify-center pt-8 max-h-96 align-center">
                <lightbox class="w-1/2 sm:border-t sm:border-gray-200 sm:pt-5" :images="[poster]"/>
              </div>
              
              <div class="pt-8">
                  <dl>
                    <div class=" sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-tv"></span>
                        Sources
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2" :class="{'skeleton-box h-8 w-full rounded-md':loading}">
                        <span v-for="(source, index) in sources" v-bind:key="index"><span v-if="index > 0">, </span> <a :href="'https://myanimelist.net/search/all?q=' + source.title.replace(/\s/g, '%20')"> {{source.title}} </a></span>

                      </dd>
                    </div>
                    <div class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-music"></span>
                        Songs
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2" :class="{'skeleton-box h-8 w-full rounded-md':loading}">
                        <span v-for="(song, index) in songs" v-bind:key="index"><span v-if="index > 0">, </span>{{song.artist}} - {{song.title}}</span>
                      </dd>
                    </div>
                    <div class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-users"></span>
                        Editors
                      </dt>
                      <dd class="flex flex-row mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2" :class="{'skeleton-box h-8 w-full rounded-md':loading}">
                        <span class="flex items-center justify-start mr-2" v-for="(editor, index) in editors" v-bind:key="index">
                          <router-link :to="`/channel/${editor.uuid}`">
                            <img v-if="editor.hasOwnProperty('uuid')" :src="editor.photoURL" class="w-16 h-auto pr-2" />
                          </router-link>
                          <router-link v-if="editor.hasOwnProperty('uuid')" :to="`/channel/${editor.uuid}`">
                            <span class="text-lg font-bold">
                              {{editor.name}}
                            </span>
                          </router-link>
                          <span v-else class="text-lg font-bold">
                              {{editor.name}}
                            </span>
                        </span>
                      </dd>
                    </div>
                    <div class="pb-5 mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:py-5">
                      <dt class="text-sm font-medium leading-5 text-gray-500">
                        <span class="fas fa-paperclip"></span>
                        Downloads
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2" :class="{'skeleton-box h-8 w-full rounded-md':loading}">
                        <ul class="border border-gray-200 rounded-md">
                          <li v-for="(option,index) in options.sources" v-bind:key="index" class="flex items-center justify-between py-3 pl-3 pr-4 text-sm leading-5">
                            <div class="flex items-center flex-1 w-0">
                              <span class="flex-1 w-0 ml-2 truncate">
                                
                              </span>
                            </div>
                            <div class="flex-shrink-0 ml-4">
                              <a :href="option.src" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
              </div>
              
              <comment-section :sharedComment="$route.params.comment" :videoRef="videoRef"/>
            </div>
            <div class="w-full my-6 lg:w-1/4">
              <div class="relative" :class="{'hidden': !theaterMode}">
                <videoBar class="absolute left-0" :horizontal="false"/>
              </div>
            </div>
          </div>
      </div>
      <span class="relative lg:w-1/4" :class="{'hidden': theaterMode}">
        <videoBar class="absolute left-0" :horizontal="false"/>
      </span>
    </div>
  </div>
</template>

<script>
import ratingModal from '../components/modals/rateVideoModal.vue'
import userInfos from '../components/modals/UserInformation.vue'
import lightbox from '../components/Lightbox.vue'
// import ratings from '../components/ratings.vue'
import followButton from '../components/followButton.vue'
import { DOMAIN_TITLE } from '../.env'

import { firestore, storage } from '../services/firebase.service'

import MetricsService from '../services/metrics.service'

export default {
  name: 'VideoPage',
  components: {
    ratingModal,
    userInfos,
    lightbox,
    followButton,
    videoPlayer: () => import('../components/videoPlayer.vue'),
    commentSection: () => ({
      component: import('../components/CommentSection.vue'),
      loading: {
        template: '<div class="w-full h-96 skeleton-box"></div>'
      },
      error: {
        template: '<div>...error</div>'
      },
      delay: 200,
      timeout: 2000
    }),
    videoBar: () => ({
      component: import('../components/videoBar.vue'),
      loading: {
        template: '<div class="w-full h-screen skeleton-box"></div>'
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
  data: function () {
    return {
      metricsService: null,
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
      poster: '',
      thumbnail: '',
      title: '',
      description: '',
      editors: [],
      tags: [],
      categorys: [],
      songs: [],
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
      showUserInfos: false,
      user: {
        name: '',
        uuid: ''
      },
      loading: false,
      hasPoster: false
    }
  },
  async mounted () {
    this.loading = true
    this.$Progress.start()
    var listRef = storage.ref(`videos/${this.videoId}/`)
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
          let url = await storage.ref(metadata.fullPath).getDownloadURL()
          // let name = metadata.name.split('-')

          options.sources.push({
            src: url,
            type: metadata.contentType
          })
        }
      }
    };

    let videoQueryRef = firestore.doc(`videos/${this.videoId}/`)
    let videoQuery = await videoQueryRef.get()
    let data = videoQuery.data()
    let user = await data.user.get()

    let editorSnapshots = []
    for (var editor of data.editors) {
      this.editors.push({ name: editor })
      let editorSnapshot = firestore.collection('users').where('name', '==', editor).limit(1)
      editorSnapshots.push(editorSnapshot.get())
    }

    let fetchedEditors = await Promise.all(editorSnapshots)
    console.log(fetchedEditors)
    for (var fetchedEditor of fetchedEditors) {
      if (fetchedEditor.size === 1) {
        let editorDoc = fetchedEditor.docs[0]
        let editorData = editorDoc.data()
        let editorName = editorData.name
        let editorId = editorDoc.id
              
        let editorIndex = this.editors.findIndex((element) => {
          return element.name === editorName
        })

        this.editors[editorIndex].uuid = editorId
        this.editors[editorIndex].photoURL = editorData.photoURL
      }
    }

    // Object.assign(this.options, options)
    this.loading = false

    this.options = options
    this.title = data.title
    this.tags = data.tags
    this.categorys = data.categorys
    this.description = data.description
    this.songs = data.songs
    this.sources = data.sources
    this.createdAt = Date.parse(data.createdAt)
    this.creationDate = Date.parse(data.creationDate)
    this.user = user.data()
    this.hasPoster = data.hasPoster

    this.ratings = data.ratings
    if (data.ratings === undefined || data.ratings == null) {
      this.ratings = []
      videoQueryRef.update({
        ratings: []
      })
    }


    this.$store.dispatch('videoPage/processRatingsArray', this.userId)

    let thumbnailsRef = await firestore.doc(`thumbnails/${this.videoId}/`)
    let thumbnailsQuery = await thumbnailsRef.get()
    let thumbnails = thumbnailsQuery.data()
    let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]
    this.thumbnail = currThumbnail

    this.spriteDimensions = {
      width: data.spriteWidth,
      height: data.spriteHeight
    }
    
    this.spriteSheet = {
      spriteSheet: data.spriteSheet,
      spriteDimensions: this.spriteDimensions
    }

    if (this.hasPoster) {
      let posterRef = await storage.ref(`poster/${this.videoId}/poster_${this.videoId}`)
      let posterUrl = await posterRef.getDownloadURL()
      this.poster = posterUrl
    }

    this.$emit('update:spriteSheet', this.spriteSheet) // updates videoplayer spritesheet for scrubbing
    this.$emit('update:poster', currThumbnail) // updates videoplayer thumbnail

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

      this.rating = data.rating
      this.$store.dispatch('videoPage/processRatingsArray', this.userId)

      if (this.isLoggedIn) {
        let uuid = this.userId
        if (this.usersThatGaveHearts.includes(uuid)) { // already voted
          this.alreadyGaveHeart = true
        }
      }
    })

    if (this.isLoggedIn) {
      this.metricsService = new MetricsService(this.userId)
    }

    this.videoRef = videoQueryRef
    this.$Progress.finish()
  },
  methods: {
    markVideoAsWatched () {
      if (this.metricsService != null) {
        this.metricsService.markVideoAsWatched(this.videoId)
      }
    },
    toggleTheaterMode () {
      this.theaterMode = !this.theaterMode
      this.$store.commit('videoPage/SET_THEATERMODE', this.theaterMode)
    },
    ratingClosed () {
      this.showRatingModal = false
      console.log('rating closed')
    },
    openRatingModal () {
      if (this.isLoggedIn) {
        this.showRatingModal = true
      } else {
        this.showErrorMsg()
      }
    },
    giveHeart () {
      if (this.isLoggedIn) {
        let uid = this.userId
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

          this.metricsService.userLikedVideoFromUser(this.user.uuid)
          this.metricsService.userLikedVideoFromEditors(this.editors)
          this.metricsService.userLikedVideoWithSources(this.sources)
          this.metricsService.userLikedVideoWithCategorys(this.categorys)
          this.metricsService.userLikedVideoWithTags(this.tags)
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
  computed: {
    userId () {
      return this.$currentUser.userInfo.uuid
    },
    videoId () {
      return this.$route.params.id
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
    ratings: {
      get () {
        return this.$store.getters['videoPage/ratings']
      },
      set (newValue) {
        return this.$store.commit('videoPage/SET_RATINGS', newValue)
      }
    },
    ratingsCount () {
      return this.$store.getters['videoPage/ratingsCount']
    },
    ratingsAvg: function () {
      return this.$store.getters['videoPage/ratingsAvg']
    },
    ratingsMedian: function () {
      return this.$store.getters['videoPage/ratingsMedian']
    }
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
