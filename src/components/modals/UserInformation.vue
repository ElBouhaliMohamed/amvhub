<template>
    <div id="userInfo" v-show="visible" class="absolute z-10 w-64 h-96">
      <div class="block">
        <div class="flex flex-col items-center justify-center w-full py-4 bg-indigo-500 rounded-t-lg">
          <img src="@/assets/avatar2.png" class="w-16 h-16 rounded-full" />
          <span class="font-bold text-gray-50">Kazumoe</span>
        </div>
        <div class="flex flex-col w-full px-2 py-4 bg-indigo-600"> <!-- some basic info about the user -->
          <span class="mb-2 text-xs font-bold text-gray-50">TEAM</span>
          <div class="flex flex-row items-center justify-start">
            <img src="@/assets/team.jpg" class="w-12 h-12"/>
            <div class="flex flex-col pl-2 text-xs text-gray-50">
              <span>
                Dreambox
              </span>
              <span class="font-thin">
                since 2019
              </span>
            </div>
          </div>
          
          <span class="pt-4 mb-2 text-xs font-bold text-gray-50">TEAM</span>
          <div class="flex flex-row items-center justify-start">
            <img src="@/assets/team.jpg" class="w-12 h-12"/>
            <div class="flex flex-col pl-2 text-xs text-gray-50">
              <span>
                Dreambox
              </span>
              <span class="font-thin">
                since 2019
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import { TweenMax } from 'gsap'

export default {
  props: {
    visible: Boolean,
    parent: String
  },
  data () {
    return {
      div: HTMLDivElement,
      container: HTMLDivElement
    }
  },
  mounted () {
    this.div = document.getElementById('userInfo')
    this.container = document.getElementById(this.parent)
  },
  methods: {
    positionDiv (e) {
      var rect = this.div.getBoundingClientRect()
      var relX = e.pageX - this.container.offsetLeft + 10
      var relY = e.pageY - this.container.offsetTop + rect.height / 2

      console.log(relX + ' ' + relY + ' ' + this.div.style.width)

      // TweenMax.to(this.div, 0.2, { x: relX, y: relY })
    }
  },
  watch: {
    visible (newValue) {
      if (newValue) {
        window.addEventListener('mousemove', this.positionDiv, false)
      } else {
        window.removeEventListener('mousemove', this.positionDiv, false)
      }
    }
  }
}
</script>

<style>

</style>
