<template>
    <div id="infos" class="flex flex-col justify-center items-center py-4 text-black">
        <span class="grid grid-cols-4 gap-2" v-if="isProcessed">
          <button @click="selectedThumbnail = index" :class="{'opacity-100' : (index === selectedThumbnail)}" class="col-span-1 opacity-50 hover:opacity-100" v-for="(thumbnail, index) in thumbnailUrls" v-bind:key="index">
            <img class="w-48" :src="thumbnail"/>
          </button>
          <div :class="{'relative flex items-center justify-center' : hasCustomThumbnail, 'opacity-50 hover:opacity-100' : hasCustomThumbnail, 'opacity-100' : (hasCustomThumbnail && selectedThumbnail === 4)}" class="w-48 h-32 col-span-1 text-center" 
          v-cloak>
            <svg v-if="!hasCustomThumbnail" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
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
                class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
              >Upload a file</button>
              or drag and drop
            </p>
            <p v-if="!hasCustomThumbnail" class="mt-1 text-xs text-gray-500">PNG or JPG up to 3MB</p>
            <img v-else class="w-48 cursor-pointer" @click="selectedThumbnail = 4" :src="customThumbnail"/>
            <span v-if="hasCustomThumbnail" class="absolute top-0 right-0 mr-3 mt-4 bg-gray-700 text-white rounded-full p-2 opacity-50 hover:opacity-100" @click="triggerFileExplorer">
             <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </span>
            <input type="file" id="inputfile" name="inputfile" class="hidden" />
          </div>
        </span>
        <span class="grid grid-cols-4 col-gap-2" v-else> <!-- not processed yet -->
          <span v-for="n in 3" v-bind:key="n" class="w-48 h-32 col-span-1 bg-gray-100 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12 text-gray-400"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
          </span>
          <span class="w-48 h-32 col-span-1 flex items-center justify-center">
            <span class="text-sm text-gray-500 leading-5 px-2">Creating thumbnails...</span>
            <loading-animation class="w-8 h-8"></loading-animation>
          </span>
        </span>
      
        <!-- <a :href="url">{{ url }}</a> -->
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
    selectCustomThumbnail (f) {
      this.customThumbnail = URL.createObjectURL(f)
      this.hasCustomThumbnail = true
      this.selectedThumbnail = 4
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
