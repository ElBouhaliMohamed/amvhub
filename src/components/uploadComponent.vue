<template>
  <div id="upload" class="flex flex-col items-center justify-center h-full">
    <div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Upload the Video
        </h3>
        <div class="my-2">
          <p class="text-sm leading-5 text-gray-500">
            Drag and drop the AMV you want to upload.
          </p>
        </div>
        <i class="p-10 text-gray-500 bg-gray-100 rounded-full cursor-pointer fas fa-upload fa-6x hover:bg-gray-300 hover:text-gray-700"
          v-cloak
          @drop.prevent="addFile"
          @dragover.prevent
        @click="triggerFileExplorer"/>
        <input type="file" id="inputfile" name="inputfile" class="inputfile" />
      </div>
    </div>
    <span class="flex w-64 mt-5 rounded-md shadow-sm sm:mt-6">
      <button @click="triggerFileExplorer" type="button" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
        Select file
      </button>
    </span>
  </div>
</template>

<script>
import { createDocumentReference, getReference, retrieveURL, setDocument, uploadFile } from './../services/firebase.functions.service'

export default {
  computed: {

  },
  methods: {
    addFile (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return

      this.startUpload(droppedFiles[0])
      console.log(droppedFiles[0])
      this.$emit('next')
    },
    triggerFileExplorer () {
      document.getElementById('inputfile').addEventListener('change', e => {
        var selectedFile = document.getElementById('inputfile').files[0]
        this.startUpload(selectedFile)
        this.$emit('next')
      })

      document.getElementById('inputfile').click()
    },
    async startUpload (file) {
      try {
        let videoDbRef = createDocumentReference('videos')
        await setDocument(videoDbRef, { uuid: videoDbRef.id })

        let MIME = file.type

        let videosRef = getReference(`videos/${videoDbRef.id}/${videoDbRef.id}.${MIME.split('/')[1]}`)

        let uploadTask = uploadFile(videosRef, file)
        let self = this
        uploadTask.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          self.$store.commit('upload/SET_PROGRESS', progress)

          console.log('Upload is ' + progress + '% done')
        }, function (error) {
          console.log(error)
        }, function () {
          retrieveURL(uploadTask.snapshot.ref).then(function (downloadURL) {
            console.log('File available at', downloadURL)
            self.$store.commit('upload/SET_UUID', videoDbRef.id)
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
