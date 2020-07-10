<template>
    <div class="flex flex-col justify-center p-10 items-left">

      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Video Information
      </h3>

      <p class="mt-1 text-sm leading-5 text-gray-500">
        Please fill out the Information while your Video gets uploaded!
      </p>

      <div class="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
        <div class="grid grid-cols-1 row-gap-6 sm:col-span-4">
          <div>
            <label for="title" class="block text-sm font-medium leading-5 text-gray-700">
              Title
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input id="title" v-model="title" class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" />
            </div>
          </div>

          <div>
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
            
          <div>
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

          <div>
              <label for="about" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Description
              </label>
              <div class="mt-1 shadow-sm rouneded-md">
                <div class="flex rounded-md shadow-sm">
                  <text-editor id="description" :initContent="description" placeholder="" :submitButton="false" @textChanged="updateDescription" class="w-full mb-2"></text-editor>
                </div>
              </div>
          </div>

          <div>
            <span class="flex flex-row items-center justify-start w-full mt-6">
              <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Thumbnail</label>
            </span>
            <span class="flex flex-row">
              <div class="flex flex-shrink-0 w-1/4" v-for="(thumbnail, index) in thumbnailUrls" v-bind:key="index">
                <button class="relative w-full transition-all duration-200 opacity-50 aspect-ratio-16/9 hover:opacity-100" @click="selectedThumbnail = index" :class="{'opacity-100' : (index === selectedThumbnail)}">
                  <img class="absolute object-cover w-full h-full" :src="thumbnail"/>
                </button>
              </div>
              <div class="flex flex-shrink-0 w-1/4" :class="{'flex items-center justify-center border-2 border-l-0 border-gray-300 border-dashed rounded-r-md': !hasCustomThumbnail}">
                <div class="relative w-full text-center" :class="{'aspect-ratio-16/9 transition-all duration-200 opacity-50 hover:opacity-100' : hasCustomThumbnail, 'opacity-100' : (hasCustomThumbnail && selectedThumbnail === 4)}" v-cloak>
                  <span v-if="!hasCustomThumbnail">
                    <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="mt-1 text-sm text-gray-600">
                      <button
                        @click="triggerFileExplorer(0)"
                        type="button"
                        class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
                      >Upload a file</button>
                    </p>
                    <p class="mt-1 text-xs text-gray-500">PNG or JPG up to 3MB</p>
                  </span>
                  <img v-else class="absolute object-cover w-full h-full" @click="selectedThumbnail = 4" :src="customThumbnail"/>

                  <span v-if="hasCustomThumbnail" class="absolute top-0 right-0 p-2 mt-4 mr-3 text-white bg-gray-700 rounded-full opacity-50 hover:opacity-100" @click="triggerFileExplorer(0)">
                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  </span>

                  <!-- input not visible but needs to be always there -->
                  <input accept="image/x-png,image/gif,image/jpeg" type="file" id="inputfile" name="inputfile" class="hidden" />
                </div>
              </div>
            </span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Editors</label>
            <div class="flex w-full mt-1 rounded-md shadow-sm">
              <!-- <treeselect :multiple="true" :async="true" :load-options="loadOptions" /> -->
                <vue-tags-input
                  id="editors"
                  class="block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  v-model="editor"
                  :tags="editors"
                  :allow-edit-tags="true"
                  :avoid-adding-duplicates="true"
                  :autocomplete-items="autocompleteEditor"
                  placeholder="Add Editors"
                  @tags-changed="newEditors => editors = newEditors"
                />
            </div>
          </div>

        </div>
        <div class="flex flex-col sm:col-span-2">
          <div>
            <div class="relative aspect-ratio-16/9">
              <img class="absolute object-cover w-full h-full" :src="currentThumbnail">
            </div>
          </div>

          <div class="mt-6">
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Creation date</label>
            <div class="flex mt-1 rounded-md shadow-sm">
              <div class="relative flex-grow focus-within:z-10">
                <input v-model="creationDate" type="date" id="creationdate" class="block w-full transition duration-150 ease-in-out rounded-none rounded-r form-input rounded-l-md sm:text-sm sm:leading-5"/>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Visibility</label>
            <div class="flex mt-1 rounded-md shadow-sm">
              <div class="relative flex-grow focus-within:z-10">
                <select id="visibility" v-model="visibility" class="block w-full transition duration-150 ease-in-out rounded-none rounded-r form-input rounded-l-md sm:text-sm sm:leading-5">
                    <option value="0">Private</option>
                    <option value="1">Unlisted</option>
                    <option value="2">Public</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mt-6">
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
          
          <div class="mt-6">
            <label for="categorys" class="block text-sm font-medium leading-5 text-gray-700">
              Categorys
            </label>
            <div class="w-full mt-1 rounded-md shadow-sm">
              <!-- <input id="anime" class="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5" /> -->
              <vue-tags-input
                id="categorys"
                class="block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                v-model="category"
                :tags="categorys"
                :allow-edit-tags="true"
                :add-only-from-autocomplete="true"
                :autocomplete-items="filteredCategoryAutocompleteItems"
                :avoid-adding-duplicates="true"
                placeholder="Add Category"
                @tags-changed="newCategorys => categorys = newCategorys"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="poster" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Poster</label>
            <div class="mt-1">
              <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="text-center" :class="{'hidden':hasPoster}" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="mt-1 text-sm text-gray-600">
                    <button
                      @click="triggerFileExplorer(1)"
                      type="button"
                      class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
                    >Upload a file</button>
                    or drag and drop
                  </p>
                  <p class="mt-1 text-xs text-gray-500">PNG or JPG up to 10MB</p>
                  <input type="file" id="inputfile" name="inputfile" class="hidden" accept="image/*" />
                </div>
                <div class="relative" v-if="hasPoster">
                  <img class="max-h-28" v-cloak @drop.prevent="addFile" :src="poster">
                  <span class="absolute top-0 right-0 p-1 mt-1 mr-1 text-black bg-white rounded-full" @click="triggerFileExplorer(1)">
                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  </span>
                </div>
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
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
import loadingAnimation from '../components/loadingAnimation2.vue'
import VueTagsInput from '@johmun/vue-tags-input'
import textEditor from '../components/textEditor'

import { getAllVideoInfos, getThumbnailInfos, uploadThumbnail, uploadPoster, updateVideoInfos, thumbnailChoosen, getPoster } from '../services/videos.service'

export default {
  components: {
    loadingAnimation,
    VueTagsInput,
    textEditor
  },
  data () {
    return {
      uuid: this.$route.params.id,
      loading: false,
      title: '',
      description: '',
      songs: [],
      sources: [],
      category: '',
      categorys: [],
      tag: '',
      tags: [],
      editor: '',
      editors: [],
      visibility: 0,
      creationDate: new Date(),
      createdAt: new Date(),

      thumbnailUrls: [],
      hasCustomThumbnail: false,
      selectedThumbnail: 0,
      currentThumbnail: Image,
      customThumbnail: Image,

      hasPoster: false,
      poster: Image,

      autocompleteEditor: [],
      categoryAutocompleteItems: [{ text: 'Action' }, { text: 'Character Profile' }, { text: 'Comedy' }, { text: 'Cross-Over' }, { text: 'Dance' }, { text: 'Drama' }, { text: 'Game Music Video (GMV)' }, { text: 'Horror' }, { text: 'Multi Editor Project (MEP)' }, { text: 'Manga Music Video (MMV)' }, { text: 'Psychedelic' }, { text: 'Romance' }, { text: 'Sentimental' }, { text: 'Trailer' }]
    }
  },
  computed: {
    filteredCategoryAutocompleteItems () {
      return this.categoryAutocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.category.toLowerCase()) !== -1
      })
    }
  },
  watch: {
    selectedThumbnail (value) {
      if (value === 4) {
        this.currentThumbnail = this.customThumbnail
      } else {
        this.currentThumbnail = this.thumbnailUrls[value]
      }
    }
  },
  async mounted () {
    this.$Progress.start()
    this.loading = true
    await this.fetchVideoInformations()
    this.loading = false
    this.$Progress.finish()
  },
  methods: {
    async save () {
      this.$Progress.start()
      await thumbnailChoosen(this.uuid, this.selectedThumbnail)

      let cleanTags = Array.from(this.tags, tag => tag.text)
      let cleanCategorys = Array.from(this.categorys, category => category.text)
      let cleanEditors = Array.from(this.editors, editor => editor.text)

      await updateVideoInfos(this.uuid, {
        title: this.title,
        songs: this.songs,
        tags: cleanTags,
        categorys: cleanCategorys,
        description: this.description,
        visibility: this.visibility,
        creationDate: this.creationDate,
        editors: cleanEditors,
        sources: this.sources,
        hasPoster: this.hasPoster
      })
      this.$Progress.finish()

      // if (this.visibility === '2') { generate feed if visibilty changed to public
      //   this.$store.dispatch('feed/generateFeedForFollowers', this.$currentUser.userInfo.uuid)
      // }
    },
    async fetchVideoInformations () {
      let videoInfos = await getAllVideoInfos(this.uuid)

      console.log(videoInfos)
      this.title = videoInfos.title
      this.songs = videoInfos.songs
      this.sources = videoInfos.sources ? videoInfos.sources : [{ title: '' }]
      this.visibility = videoInfos.visibility
      this.description = videoInfos.description

      this.categorys = Array.from(videoInfos.categorys, category => { return { 'text': category } })
      this.tags = Array.from(videoInfos.tags, tag => { return { 'text': tag } })
      this.editors = Array.from(videoInfos.editors, editor => { return { 'text': editor } })

      this.createdAt = new Date(videoInfos.createdAt.toDate())
      this.creationDate = new Date(videoInfos.creationDate.toDate()).toISOString().slice(0, 10)

      let thumbnailInfos = await getThumbnailInfos(this.uuid)
      this.thumbnailUrls = thumbnailInfos.thumbnails

      if (thumbnailInfos.customThumbnail != null) {
        this.hasCustomThumbnail = true
        this.customThumbnail = thumbnailInfos.customThumbnail
      }

      this.selectedThumbnail = thumbnailInfos.active

      this.hasPoster = videoInfos.hasPoster ? videoInfos.hasPoster : false
      if (this.hasPoster) {
        this.poster = await getPoster(this.uuid)
        console.log(this.poster)
      }

      console.log(thumbnailInfos)
    },
    updateDescription (value) {
      this.description = value
    },
    addSong () {
      this.songs.push({ artist: '', title: '' })
    },
    removeSong (index) {
      if (this.songs.length > 1) {
        delete this.songs[index]
      }
    },
    addSource () {
      this.sources({ title: '' })
    },
    removeSource (index) {
      if (this.sources.length > 1) {
        delete this.sources[index]
      }
    },
    triggerFileExplorer (mode) { // 0 thumbnail 1 is poster
      document.getElementById('inputfile').addEventListener('change', e => {
        var selectedFile = document.getElementById('inputfile').files[0]

        switch (mode) {
          case 0:
            this.selectCustomThumbnail(selectedFile)
            break
          case 1:
            this.uploadPoster(selectedFile)
            break
        }
      })

      document.getElementById('inputfile').click()
    },
    async selectCustomThumbnail (file) {
      this.$Progress.start()
      this.hasCustomThumbnail = true
      this.selectedThumbnail = 4
      this.customThumbnail = await uploadThumbnail(this.uuid, file)
      this.$Progress.finish()
    },
    async uploadPoster (file) {
      this.$Progress.start()
      this.poster = await uploadPoster(this.uuid, file)
      this.hasPoster = true
      this.$Progress.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
  .vue-tags-input {
    max-width: 100%;
  }
</style>
