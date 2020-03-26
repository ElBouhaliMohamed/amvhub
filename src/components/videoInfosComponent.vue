<template>

    <div id="infos" class="flex flex-col justify-center items-left">

      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Video Information
      </h3>

      <p class="mt-1 text-sm leading-5 text-gray-500">
        Please fill out the Information while your Video gets uploaded!
      </p>

      <div class="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
        <div class="sm:col-span-6">
          <label for="title" class="block text-sm font-medium leading-5 text-gray-700">
            Title
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="title" v-model="title" class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="song" class="block text-sm font-medium leading-5 text-gray-700">
            Songs
          </label>
          <div class="flex mt-1 rounded-md shadow-sm" v-for="(song, index) in songs" :key="index">
            <div class="relative flex focus-within:z-10">
              <div class="flex-1 w-1/2 min-w-0">
                <input v-model="song.artist" aria-label="Song Artists" class="relative block w-full transition duration-150 ease-in-out bg-transparent rounded-none form-input rounded-l-md focus:z-10 sm:text-sm sm:leading-5" placeholder="Artists" />
              </div>
              <div>
                <input v-model="song.title" aria-label="Song Title" class="block w-full transition duration-150 ease-in-out border-t border-b border-l-0 rounded-none form-input sm:text-sm sm:leading-5" placeholder="Title" />
              </div>
            </div>
            <button v-if="index == (songs.length - 1)" @click="addSong" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
            </button>
            <button v-else @click="removeSong(index)" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="sources" class="block text-sm font-medium leading-5 text-gray-700">
            Sources
          </label>
          <div class="flex mt-1 rounded-md shadow-sm" v-for="(source, index) in sources" :key="index">
            <div class="relative flex-grow focus-within:z-10">
              <input v-model="source.title" aria-label="Sources Title"  class="block w-full transition duration-150 ease-in-out rounded-none form-input rounded-l-md sm:text-sm sm:leading-5" />
            </div>
            <button v-if="index == (sources.length - 1)" @click="addSource" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
            </button>
            <button v-else @click="removeSource(index)" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="anime" class="block text-sm font-medium leading-5 text-gray-700">
            Tags
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <!-- <input id="anime" class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" /> -->
            <vue-tags-input
              id="tags"
              class="block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              v-model="tag"
              :tags="tags"
              :allow-edit-tags="true"
              :add-only-from-autocomplete="true"
              :autocomplete-items="items"
              @tags-changed="newTags => tags = newTags"
            />
          </div>
        </div>
        <span class="flex flex-row items-center justify-center sm:col-span-4">
            <progress-bar
              :value="progress"
              class="w-11/12 m-auto"
            />
            <span class="w-1/12 pl-2 text-xs leading-5 text-gray-500 sm:col-span-1">
                  {{progress}}%
            </span>
        </span>

        <span class="flex items-center justify-center rounded-md shadow-sm sm:col-span-2 sm:col-start-5">
          <button @click="saveInfos" type="button" :class="{'cursor-not-allowed' : !doneUploading}" class="inline-flex justify-center w-3/4 px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
            Save
          </button>
        </span>
      </div>
    </div>

</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import firebase from 'firebase'
import ProgressBar from 'vue-progressbar-component'

export default {
  components: {
    VueTagsInput,
    ProgressBar
  },
  data () {
    return {
      tag: '',
      tags: [],
      autocompleteItems: ['Drama', 'Action', 'Romance', 'Psyche', 'Horror']
    }
  },
  computed: {
    doneUploading () {
      return !(this.progress < 100)
    },
    items () {
      return this.autocompleteItems.filter(a => {
        return a.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      }).map(a => ({ text: a }))
    },
    title: {
      get: function () {
        return this.$store.getters['upload/title']
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_TITLE', newValue)
      }
    },
    songs: {
      get: function () {
        return this.$store.getters['upload/songs']
      },
      set: function (newValue) {
        this.$store.commit('upload/PUT_SONG', newValue)
      }
    },
    sources: {
      get: function () {
        return this.$store.getters['upload/sources']
      },
      set: function (newValue) {
        this.$store.commit('upload/PUT_SOURCE', newValue)
      }
    // },
    // tags: {
    //   get: function () {
    //     return this.$store.getters['upload/tags']
    //   },
    //   set: function (newValue) {
    //     this.$store.commit('upload/SET_SOURCES', newValue)
    //   }
    },
    progress: {
      get: function () {
        return parseFloat(this.$store.getters['upload/progress'].toFixed(2))
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_PROGRESS')
      }
    }
  },
  methods: {
    addSong () {
      this.$store.commit('upload/PUSH_SONG', { artist: '', title: '' })
    },
    removeSong (index) {
      this.$store.commit('upload/REMOVE_SONG', index)
    },
    addSource () {
      this.$store.commit('upload/PUSH_SOURCE', { title: '' })
    },
    removeSource (index) {
      this.$store.commit('upload/REMOVE_SOURCE', index)
    },
    async saveInfos () {
      let uuid = this.$store.getters['upload/uuid']
      let videoDbRef = await firebase.firestore().collection('videos').doc(uuid)

      let userUuid = this.$store.state.user.currentUser.currentUser.uid
      console.log(userUuid)
      let userRef = await firebase.firestore().collection('users').doc(userUuid)
      console.log(userRef)

      // TODO: add validation checks for the input
      await videoDbRef.set({
        title: this.title,
        songs: this.songs,
        tags: this.tags,
        editor: 'TestUpload',
        user: userRef,
        views: 0,
        hearts: 0,
        public: false
      })

      this.$store.commit('upload/SET_URL', `localhost:8080/video/${uuid}`)

      this.$emit('next') // next screen
    }
  },
  watch: {
    tags: function (newTags) {
      this.$store.commit('upload/SET_TAGS', newTags)
    }
  }
}
</script>

<style lang="scss" scoped>

.vue-tags-input {
  @apply w-full
}
</style>
