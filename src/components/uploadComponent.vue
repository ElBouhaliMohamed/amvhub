<template>
  <div id="upload" class="h-full flex flex-col justify-center items-center">
    <div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Upload the Video
        </h3>
        <div class="my-2">
          <p class="text-sm leading-5 text-gray-500">
            Drag and drop the AMV you want to upload.
          </p>
        </div>
        <i class="fas fa-upload fa-6x bg-gray-100 text-gray-500 rounded-full p-10 cursor-pointer hover:bg-gray-300 hover:text-gray-700"
          v-cloak
          @drop.prevent="addFile"
          @dragover.prevent
        @click="triggerFileExplorer"/>
        <input type="file" id="inputfile" name="inputfile" class="inputfile" />
      </div>
    </div>
    <span class="flex w-full rounded-md shadow-sm mt-5 sm:mt-6">
      <button @click="triggerFileExplorer" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
        Select file
      </button>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  computed: {

  },
  methods: {
    addFile (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      [...droppedFiles].forEach(f => {
        console.log(f)
      })

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
        let videoDbRef = await firebase.firestore().collection('videos').doc()
        await videoDbRef.set({ uuid: videoDbRef.id })
        let videosRef = await firebase.storage().ref('videos').child(`${videoDbRef.id}`).child(`${videoDbRef.id}`)

        let uploadTask = videosRef.put(file)
        let self = this
        uploadTask.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          self.$store.commit('upload/SET_PROGRESS', progress)

          console.log('Upload is ' + progress + '% done')
        }, function (error) {
          console.log(error)
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
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
