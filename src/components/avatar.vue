<template>

  <!-- <div class="flex flex-col items-center justify-center">
    <img :src="avatar" class="w-64 h-64 py-2" />
    <div id="pick-avatar" class="flex items-center justify-center w-full bg-grey-lighter">
        <label class="flex flex-col items-center w-64 px-4 py-6 tracking-wide uppercase bg-white border rounded-lg shadow-xl cursor-pointer border-primary hover">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Select a file</span>
            <input type='file' class="hidden" />
        </label>
    </div>
        <avatar-cropper
        trigger="#pick-avatar"
        :labels="labels"
        upload-url="https://demo.overtrue.me/upload.php"
        @uploaded="uploaded"/>
  </div> -->
  
  <div class="mt-2 sm:mt-0 sm:col-span-2">
  <div class="flex items-center">
    <span class="w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
      <svg
        class="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        v-if="avatar.length == 0"
      >
        <path
          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <img v-else :src="avatar" class="w-auto h-12" />
    </span>
    <span class="ml-5 rounded-md shadow-sm">
      <!-- <button
        type="button"
        class=""
      >Change</button> -->
        <button type="button" id="pick-avatar" class="px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
            Change
            <input type='file' accept="image/*" class="hidden" />
        </button>
    </span>
    <avatar-cropper
        trigger="#pick-avatar"
        :labels="labels"
        upload-url="https://demo.overtrue.me/upload.php"
        @uploaded="uploaded"/>
  </div>
</div>
</template>

<script>
export default {
  components: {
    AvatarCropper: () => ({
      component: import('../components/AvatarCroper')
    })
  },
  data () {
    return {
      avatar: '',
      labels: {
        submit: 'Submit',
        cancel: 'Cancel'
      }
    }
  },
  methods: {
    uploaded (file) {
      this.$emit('uploaded', file)
  
      var reader = new FileReader()
      reader.onload = () => {
        this.avatar = reader.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
