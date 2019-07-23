<template>

  <div class="flex flex-col items-center justify-center">
    <img :src="avatar" class="w-64 h-64 py-2" />
    <div id="pick-avatar" class="flex w-full items-center justify-center bg-grey-lighter">
        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-xl tracking-wide uppercase border border-primary cursor-pointer hover:bg-background-light hover:text-primary-dark">
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
  </div>
  
</template>

<script>
import AvatarCropper from "../components/AvatarCroper";

export default {
  components: { AvatarCropper },
  data() {
    return {
      avatar: "data:image/png;base64,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",
      labels: {
        submit: "Submit",
        cancel: "Cancel"
      }
    };
  },
  methods: {
    uploaded(file) {
      this.$emit('uploaded', file);
  
      var reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result;
      };
      reader.readAsDataURL(file); 
    }
  }
};
</script>

<style>

</style>