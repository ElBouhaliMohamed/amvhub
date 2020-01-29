<template>
  <div id="upload" class="h-full flex flex-col justify-center items-center py-4 text-white">
    <i
      class="fas fa-upload fa-6x bg-gray-600 rounded-full p-10 cursor-pointer hover:bg-gray-500"
      v-cloak
      @drop.prevent="addFile"
      @dragover.prevent
      @click="triggerFileExplorer"
    ></i>
    <input type="file" id="inputfile" name="inputfile" class="inputfile" />
    <span class="py-4">Drag and drop the AMV you want to upload</span>
    <button class="btn btn-primary uppercase" @click="triggerFileExplorer">select file</button>
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
            self.$store.commit('upload/SET_URL', downloadURL)
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
