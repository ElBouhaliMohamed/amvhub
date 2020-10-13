<template>
    <modal :show="show" :closeCallback="closeCallback">
        <div class="bg-white shadow sm:rounded-lg">
            <div class="py-2">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Rate the video
                </h3>
                <div class="mt-5">
                    <div class="px-4 py-5 rounded-md bg-gray-50 sm:flex sm:items-start sm:justify-between">
                        <div class="flex flex-col w-full">
                            <div class="flex flex-col p-4 border-t border-b">
                                <div class="flex justify-between space-x-4 rounded-md">
                                    <label class="">Concept</label>
                                    <VueStars
                                        name="concept"
                                        :max="10"
                                        v-bind:value="concept"
                                    />
                                </div>
                                <p class="mt-4 text-xs text-left text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic culpa ea repudiandae rem dolor saepe cumque, architecto non eveniet tempora.</p>
                            </div>

                            <div class="flex flex-col p-4 border-b">
                                <div class="flex justify-between space-x-4 rounded-md">
                                <label class="">Editing</label>
                                <VueStars
                                    name="editing"
                                    :max="10"
                                    v-bind:value="editing"
                                />
                                </div>
                                <p class="mt-4 text-xs text-left text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic culpa ea repudiandae rem dolor saepe cumque, architecto non eveniet tempora.</p>
                            </div>

                            <div class="flex flex-col p-4 border-b">
                                <div class="flex justify-between space-x-4 rounded-md">
                                <label class="">Enjoyment</label>
                                <VueStars
                                    name="enjoyment"
                                    :max="10"
                                    v-bind:value="enjoyment"
                                />
                                </div>
                                <p class="mt-4 text-xs text-left text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic culpa ea repudiandae rem dolor saepe cumque, architecto non eveniet tempora.</p>
                            </div>

                            <div class="flex flex-col p-4 border-b">
                                <div class="flex justify-between space-x-4 rounded-md">
                                <label class="">Visuals</label>
                                <VueStars
                                    name="visuals"
                                    :max="10"
                                    v-bind:value="visuals"
                                />
                                </div>
                                <p class="mt-4 text-xs text-left text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic culpa ea repudiandae rem dolor saepe cumque, architecto non eveniet tempora.</p>
                            </div>

                            <p>
                              Rating {{ratingAvg}}
                            </p>

                            <div class="flex flex-col p-4">
                              <span class="inline-flex rounded-md shadow-sm">
                                <button @click="rate" type="button" class="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                  Rate
                                </button>
                              </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { VueStars } from 'vue-stars'
import { rateVideo } from '../../services/videos.service'

export default {
  components: {
    modal: () => ({
      modal: () => ({
        component: import('./modal.vue')
      })
    }),
    VueStars
  },
  props: {
    show: Boolean,
    closeCallback: Function,
    videoRef: Object,
    userId: String
  },
  data () {
    return {
      concept: 0,
      editing: 0,
      visuals: 0,
      enjoyment: 0
    }
  },
  computed: {
    ratingAvg () {
      var avg = (this.concept + this.editing + this.visuals + this.enjoyment) / 4
      return avg
    }
  },
  methods: {
    async rate () {
      let rating = [
        { name: 'concept', value: this.concept },
        { name: 'editing', value: this.editing },
        { name: 'visuals', value: this.visuals },
        { name: 'enjoyment', value: this.enjoyment }
      ]

      await rateVideo(this.videoRef, this.userId, rating)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
