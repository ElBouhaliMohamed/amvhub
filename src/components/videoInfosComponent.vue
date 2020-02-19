<template>
    <div id="infos" class="h-full flex flex-row justify-center items-center py-4 text-white">
        <div class="flex w-full flex-col items-start">
                <div class="flex w-full py-2">
                  Please fill out the Informations while your Video gets uploaded!
                 {{progress}}%
                  <!-- <loadingAnimation></loadingAnimation> -->
                </div>

                <div class="flex w-full py-2">
                  <label class="w-1/2">Title</label>
                  <input type="text" placeholder="" v-model="title">
                </div>
                <div class="flex w-full py-2">
                  <label class="w-1/2">Songs</label>
                  <div v-for="song in songs" :key="song">
                    <input  type="text" placeholder="" :value="song">
                  </div>
                  <button @click="songs.push(song)">Add</button>
                </div>
                <div class="flex w-full py-2">
                  <label class="w-1/2">Anime</label>
                  <input type="text" placeholder="" v-model="title">
                </div>

            <vue-tags-input
                class="my-2"
                v-model="tag"
                :tags="tags"
                :allow-edit-tags="true"
                :autocomplete-items="autocompleteItems"
                @tags-changed="newTags => tags = newTags"
            />

        <button class="btn btn-primary" @click="saveInfos()">NEXT</button>

        </div>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import loadingAnimation from './loadingAnimation'
import firebase from 'firebase'

export default {
  components: {
    VueTagsInput,
    loadingAnimation
  },
  data () {
    return {
      tag: '',
      autocompleteItems: [
        {
          text: 'Drama'
        }, {
          text: 'Romance'
        }, {
          text: 'Action'
        }, {
          text: 'Psyche'
        }, {
          text: 'Horror'
        }
      ]
    }
  },
  computed: {
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
        this.$store.commit('upload/SET_SONGS', newValue)
      }
    },
    sources: {
      get: function () {
        return this.$store.getters['upload/sources']
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_SOURCES', newValue)
      }
    },
    tags: {
      get: function () {
        return this.$store.getters['upload/tags']
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_SOURCES', newValue)
      }
    },
    progress: {
      get: function () {
        return this.$store.getters['upload/progress'].toFixed(2)
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_PROGRESS')
      }
    }
  },
  methods: {
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
        hearts: 0
      })

      this.$store.commit('upload/SET_URL', `localhost:8080/video/${uuid}`)

      this.$emit('next') // next screen
    }
  }
}
</script>

<style lang="scss" scoped>

input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #333; width: 100%; box-sizing: border-box; letter-spacing: 1px;}
:focus{outline: none;}
.col-3{float: left; width: 27.33%; margin: 40px 3%; position: relative;} /* necessary to give position: relative to parent. */
input[type="text"]{font: 15px/24px "Lato", Arial, sans-serif; color: #333; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

.effect-16 {background: transparent}
.effect-16 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-16:focus ~ .focus-border,
.has-content.effect-16 ~ .focus-border{width: 100%; transition: 0.4s;}
.effect-16 ~ label{position: absolute; left: 0; width: 100%; top: 5px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-16:focus ~ label, .has-content.effect-16 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

</style>
