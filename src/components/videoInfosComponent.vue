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
            <div class="relative flex flex-grow focus-within:z-10">
              <div class="flex-1 w-1/2 min-w-0">
                <input v-model="song.artist" aria-label="Song Artists" class="relative block w-full transition duration-150 ease-in-out bg-transparent rounded-none form-input rounded-l-md focus:z-10 sm:text-sm sm:leading-5" placeholder="Artists" />
              </div>
              <div class="w-1/2">
                <input v-model="song.title" aria-label="Song Title" class="block w-full transition duration-150 ease-in-out border-t border-b border-l-0 rounded-none form-input sm:text-sm sm:leading-5" placeholder="Title" />
              </div>
            </div>
            <button @click="removeSong(index)" :class="{'cursor-not-allowed': songs.length <= 1}" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
            <button @click="addSong" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
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
            <button @click="removeSource(index)" :class="{'cursor-not-allowed': sources.length <= 1}" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-none bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
            <button @click="addSource" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="anime" class="block text-sm font-medium leading-5 text-gray-700">
            Categorys
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <!-- <input id="anime" class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" /> -->
            <vue-tags-input
              id="categorys"
              class="block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              v-model="category"
              :tags="categorys"
              :allow-edit-tags="true"
              :add-only-from-autocomplete="true"
              :autocomplete-items="items"
              :avoid-adding-duplicates="true"
              placeholder="Add Category"
              @tags-changed="newCategorys => categorys = newCategorys"
            />
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
              :avoid-adding-duplicates="true"
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

        <span class="flex items-center justify-center rounded-md shadow-sm sm:justify-end sm:col-span-2 sm:col-start-5">
          <button @click="proceed" type="button" :class="{'cursor-not-allowed' : !doneUploading}" class="inline-flex justify-center w-full px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
            Save
          </button>
        </span>
      </div>
    </div>

</template>

<script>

export default {
  components: {
    VueTagsInput: () => ({
      component: import('@johmun/vue-tags-input')
    }),
    ProgressBar: () => ({
      component: import('vue-progressbar-component')
    })
  },
  data () {
    return {
      tag: '',
      tags: [],
      category: '',
      categorys: [],
      autocompleteItems: ['Action', 'Character Profile', 'Comedy', 'Cross-Over', 'Dance', 'Drama', 'Game Music Video (GMV)', 'Horror', 'Multi Editor Project (MEP)', 'Manga Music Video (MMV)', 'Psychedelic', 'Romance', 'Sentimental', 'Trailer']
    }
  },
  computed: {
    doneUploading () {
      return !(this.progress < 100)
    },
    items () {
      return this.autocompleteItems.filter(a => {
        return a.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
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
      if (this.songs.length > 1) {
        this.$store.commit('upload/REMOVE_SONG', index)
      }
    },
    addSource () {
      this.$store.commit('upload/PUSH_SOURCE', { title: '' })
    },
    removeSource (index) {
      if (this.sources.length > 1) {
        this.$store.commit('upload/REMOVE_SOURCE', index)
      }
    },
    proceed () {
      this.$emit('next') // next screen
    }
  },
  watch: {
    tags: function (newTags) {
      this.$store.commit('upload/SET_TAGS', newTags)
    },
    categorys: function (newCategorys) {
      this.$store.commit('upload/SET_CATEGORYS', newCategorys)
    }
  }
}
</script>

<style lang="scss" scoped>

.vue-tags-input {
  @apply max-w-full
}
</style>
