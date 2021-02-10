<template>
    <div ref="menu" @keyup.esc="open = false" class="relative inline-block text-left">
        <div>
            <span class="rounded-md shadow-sm">
                <button @click="open = !open" type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    {{ title }}
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </span>
        </div>
        <transition
            enter-active-class="duration-100 ease-out"
            enter-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="duration-75 ease-in"
            leave-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
        >
            <div v-show="open" class="absolute right-0 z-10 w-56 mt-2 origin-top-right transform rounded-md shadow-lg">
                <div class="bg-white rounded-md shadow-xs">
                    <div class="py-1">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Options'
    }
  },
  data () {
    return {
      open: false
    }
  },
  mounted () {
    // document.addEventListener('click', evt => {
    //   evt.stopPropagation()
    //   if (!this.$refs.menu.contains(evt.target)) {
    //     this.open = false
    //   }
    // })
  }
}
</script>
