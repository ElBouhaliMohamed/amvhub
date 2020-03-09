<template>

  <div class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-16 sm:flex sm:items-center sm:justify-center z-50">

    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">

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
import uploadComponent from '../components/uploadComponent.vue'
import videoInformationComponent from '../components/videoInfosComponent.vue'
import publishComponent from '../components/publishVideoComponent.vue'

export default {
  name: 'Upload',
  data () {
    return {
      stateId: 0,
      currentView: 'uploadComponent',
      notProgressed: 'w-full h-1 bg-gray-500 rounded-full',
      progressed: 'w-full h-1 bg-purple-500 rounded-full',
      baseStyling: 'transition-all fas text-gray-500 rounded-full border-2 m-4 p-4',
      baseIcon: 'fa-check text-purple-500  border-purple-500',
      states: [
        { id: 0, icon: 'fa-upload' },
        { id: 1, icon: 'fa-question' },
        { id: 2, icon: 'fa-globe' }
      ]
    }
  },
  components: {
    uploadComponent, videoInformationComponent, publishComponent
  },
  methods: {
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
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>
