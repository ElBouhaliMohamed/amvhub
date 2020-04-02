<template>

  <div class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-16 sm:flex sm:items-center sm:justify-center z-50">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:w-full sm:p-6">

      <div class="flex flex-row justify-between items-center">
        <span class="text-xl leading-5 text-black">Upload a video</span>
        <button @click="close" class="text-gray-500 hover:text-gray-800">
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <div class="py-2 border-b-2 border-gray-500 opacity-10">
      </div>

      <div id="stepper" class="flex justify-center items-center pb-4">
          <div :class="['flex items-center', state.id < states.length-1 ? 'w-48' : '' ]" v-for="state in states" v-bind:key="state.id">
            <transition name="component-fade">
              <i v-if="stateId > state.id" :class="[baseStyling, baseIcon]"></i>
              <i v-else :class="[baseStyling, state.icon]"></i>
            </transition>
            <span v-if="state.id < states.length-1" :class="['stepper', (stateId > state.id) ? progressed : notProgressed]"></span>
          </div>
      </div>

      <transition name="component-fade" mode="out-in">
        <component v-bind:is="currentView" @next="nextComponent"></component>
      </transition>

    </div>
  </div>

</template>

<script>
import modal from '../components/modals/modal.vue'
import uploadComponent from '../components/uploadComponent.vue'
import videoInformationComponent from '../components/videoInfosComponent.vue'
import publishComponent from '../components/publishVideoComponent.vue'

export default {
  name: 'Upload',
  data () {
    return {
      notProgressed: 'w-full h-1 bg-gray-500 rounded-full',
      progressed: 'w-full h-1 bg-purple-500 rounded-full',
      baseStyling: 'transition-all fas text-gray-500 rounded-full border-2 m-4 p-4',
      baseIcon: 'fa-check text-purple-500 border-purple-500',
      states: [
        { id: 0, icon: 'fa-upload' },
        { id: 1, icon: 'fa-question' },
        { id: 2, icon: 'fa-globe' }
      ]
    }
  },
  components: {
    uploadComponent, videoInformationComponent, publishComponent, modal
  },
  computed: {
    currentView: {
      get: function () {
        return this.$store.getters['upload/currentView']
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_CURRENTVIEW', newValue)
      }
    },
    stateId: {
      get: function () {
        return this.$store.getters['upload/stateId']
      },
      set: function (newValue) {
        this.$store.commit('upload/SET_STATEID', newValue)
      }
    },
    isDone: {
      get: function () {
        return this.$store.getters['upload/isDone']
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.stateId > 0 && !this.isDone) {
      const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
      if (answer) {
        this.$store.commit('upload/CLEAR')
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    cancel () {
      this.close()
    },
    close () {
      this.$router.push('/admin')
    },
    nextComponent () {
      switch (this.stateId) {
        case 0:
          this.currentView = 'videoInformationComponent'
          this.stateId++
          break
        case 1:
          this.currentView = 'publishComponent'
          this.stateId++
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
