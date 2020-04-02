<template>
    <div id="publish" class="flex flex-col justify-center py-4 text-black items-left">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Video Information
      </h3>

      <p class="mt-1 text-sm leading-5 text-gray-500">
        Please fill out the Information while your thumbnails get generated!
      </p>

      <span v-if="isProcessed" class="flex flex-row items-center justify-start w-full mt-6">
        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Thumbnail</label>
      </span>
      <span v-else class="flex flex-row items-center justify-start w-full pb-2 mt-6">
        <label for="email" class="block pr-2 text-sm font-medium leading-5 text-gray-700">Thumbnail</label>
        <loading-animation class="w-4 h-4"></loading-animation>
      </span>
      <span class="grid grid-cols-4 gap-2" v-if="isProcessed">
        <button @click="selectedThumbnail = index" :class="{'opacity-100' : (index === selectedThumbnail)}" class="col-span-1 transition-all duration-200 opacity-50 hover:opacity-100" v-for="(thumbnail, index) in thumbnailUrls" v-bind:key="index">
          <img class="w-48" :src="thumbnail"/>
        </button>
        <div :class="{'relative flex items-center justify-center transition-all duration-200 opacity-50 hover:opacity-100' : hasCustomThumbnail, 'opacity-100' : (hasCustomThumbnail && selectedThumbnail === 4)}" class="w-48 h-32 col-span-1 text-center"
        v-cloak>
          <svg v-if="!hasCustomThumbnail" class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p v-if="!hasCustomThumbnail" class="mt-1 text-sm text-gray-600">
            <button
              @click="triggerFileExplorer"
              type="button"
              class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
            >Upload a file</button>
          </p>
          <p v-if="!hasCustomThumbnail" class="mt-1 text-xs text-gray-500">PNG or JPG up to 3MB</p>
          <img v-else class="w-48 cursor-pointer" @click="selectedThumbnail = 4" :src="customThumbnail"/>
          <span v-if="hasCustomThumbnail" class="absolute top-0 right-0 p-2 mt-4 mr-3 text-white bg-gray-700 rounded-full opacity-50 hover:opacity-100" @click="triggerFileExplorer">
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </span>
          <input type="file" id="inputfile" name="inputfile" class="hidden" />
        </div>
      </span>
      <span class="grid grid-cols-4 col-gap-2" v-else> <!-- not processed yet -->
        <span v-for="n in 4" v-bind:key="n" class="flex items-center justify-center w-48 h-32 col-span-1 bg-gray-100">
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12 text-gray-400"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
        </span>
        <!-- <span class="flex items-center justify-center w-48 h-32 col-span-1">
          <span class="px-2 text-sm leading-5 text-gray-500">Creating thumbnails...</span>
          <loading-animation class="w-8 h-8"></loading-animation>
        </span> -->
      </span>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Studio/Team</label>
        <div class="flex mt-1 rounded-md shadow-sm">
          <div class="relative flex-grow focus-within:z-10">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <select id="team" class="block w-full pl-10 transition duration-150 ease-in-out rounded-none rounded-r form-input rounded-l-md sm:text-sm sm:leading-5">
                <option>Dream Box</option>
                <option>Soul's Team</option>
                <option>Indigo Team</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Creation date</label>
        <div class="flex mt-1 rounded-md shadow-sm">
          <div class="relative flex-grow focus-within:z-10">
            <input type="date" id="creationdate" class="block w-full transition duration-150 ease-in-out rounded-none rounded-r form-input rounded-l-md sm:text-sm sm:leading-5"/>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <button @click="save" type="submit" class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
          <span class="absolute left-0 pl-3 inset-y">
            <svg class="w-5 h-5 text-indigo-500 transition duration-150 ease-in-out group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Save and Close
        </button>
      </div>

      <a :href="url">{{ url }}</a>
    </div>
</template>

<script>
import firebase from 'firebase'
import loadingAnimation from '../components/loadingAnimation2.vue'

export default {
  mounted () {
    console.log('Publish Video Component mounted')
    let self = this
    firebase.firestore().collection('thumbnails').doc(this.videoUID)
      .onSnapshot(function (doc) {
        let data = doc.data()
        console.log(data)
        self.isProcessed = data.isProcessed
        if (self.isProcessed) {
          self.thumbnailUrls = data.thumbnails
        }
      })
  },
  data () {
    return {
      customThumbnail: Image,
      hasCustomThumbnail: false
    }
  },
  components: {
    loadingAnimation
  },
  methods: {
    triggerFileExplorer () {
      document.getElementById('inputfile').addEventListener('change', e => {
        var selectedFile = document.getElementById('inputfile').files[0]
        this.selectCustomThumbnail(selectedFile)
      })

      document.getElementById('inputfile').click()
    },
    addFile (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        this.selectCustomThumbnail(f)
      })
    },
    async selectCustomThumbnail (f) {
      let customThumbnailRef = firebase.storage().ref(`thumbnails/${this.videoUID}`).child(`thumb_${this.videoUID}_4`)
      let snapshot = await customThumbnailRef.put(f)
      this.hasCustomThumbnail = true
      this.selectedThumbnail = 4
      let thumbURL = await snapshot.ref.getDownloadURL()
      this.customThumbnail = thumbURL.toString()
      firebase.firestore().collection('thumbnails').doc(this.videoUID).update({
        customThumbnail: thumbURL.toString()
      })
    },
    async thumbnailChoosen (activeId) {
      firebase.firestore().collection('thumbnails').doc(this.videoUID).update({
        active: activeId
      })
    },
    async save () {
      this.thumbnailChoosen(this.selectedThumbnail)
      this.$store.dispatch('feed/generateFeedForFollowers', this.$currentUser.userInfo.uid)
    }
  },
  computed: {
    selectedThumbnail: {
      get () {
        return this.$store.getters['upload/selectedThumbnail']
      },
      set (newValue) {
        this.$store.commit('upload/SET_SELECTEDTHUMBNAIL', newValue)
      }
    },
    thumbnailUrls: {
      get () {
        return this.$store.getters['upload/thumbnailUrls']
      },
      set (newValue) {
        this.$store.commit('upload/SET_THUMBNAILURLS', newValue)
      }
    },
    isProcessed: {
      get () {
        return this.$store.getters['upload/thumbnailsProcessed']
      },
      set (newValue) {
        this.$store.commit('upload/SET_THUMBNAILSPROCESSED', newValue)
      }
    },
    videoUID () {
      return this.$store.getters['upload/uuid']
    },
    url () {
      return this.$store.getters['upload/url']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
