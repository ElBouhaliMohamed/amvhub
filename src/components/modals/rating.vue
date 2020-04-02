<template>
    <modal :show="show" customClass="" :closeCallback="closeCallback">
        <div class="flex flex-row align-center justify-center">
            
            <div class="flex flex-col w-1/2 h-full">

                <div class="flex w-full justify-between">
                    <label class="">Creativity:</label>
                    <VueStars
                        name="demo"
                        :max="10"
                    />
                </div>

                <div class="flex w-full justify-between">
                    <label class="">Concept:</label>
                    <VueStars
                        name="demo"
                        :max="10"

                    />
                </div>

                <div class="flex w-full justify-between">
                    <label class="">Editing:</label>
                    <VueStars
                        name="demo"
                        :max="10"
                    />
                </div>

            </div>
        </div>
    </modal>
</template>

<script>
import modal from './modal.vue'
import { VueStars } from 'vue-stars'

export default {
  components: {
    modal,
    VueStars
  },
  props: {
    show: Boolean,
    closeCallback: Function
  }
}
</script>

<style lang="scss" scoped>
</style>
