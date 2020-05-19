<template>
  <div id="comments">
    <div class="flex flex-col sm:border-t sm:border-gray-200 sm:pt-5">
      <div v-if="isLoggedIn" class="flex flex-row">
        <img :src="avatar" alt="avatar" class="w-10 h-10 mr-2 rounded-full" />
        <div class="w-full">
            <text-editor placeholder="Tell us your thoughts" :submitButton="true" submitButtonText="COMMENT" @submit="saveComment" @textChanged="updateComment" class="mb-2"></text-editor>
        </div>
      </div>
    </div>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit" id="commentsection" class="flex flex-col p-2 rounded-md bg-gray-50">
      <comment v-for="(comments, index) in commentSection" v-bind:key="index" :comment="comments.comment" :children="comments.children" />
    </div>
  </div>
</template>

<script>
import comment from './comment'
import textEditor from './textEditor'
import { saveComment, retrieveTopLevelComments, retrieveChildren } from '../services/comments.service'

export default {
  data () {
    return {
      length: 0,
      limit: 5,
      busy: false,
      comment: '',
      topLevelComments: [],
      commentSection: []
    }
  },
  components: {
    textEditor,
    comment
  },
  props: {
    videoRef: Object
  },
  methods: {
    saveComment () {
      if (this.comment.length > 0) {
        let userUUID = this.$store.state.user.currentUser.userInfo.uuid
        saveComment(this.comment, userUUID, this.videoRef)
        
        this.comment = ''
      }
    },
    updateComment (comment) {
      this.comment = comment
    },
    async loadMore () { // load more comments
      if (!this.busy && !this.topLevelComments.empty && this.length <= this.topLevelComments.size) {
        let difference = (this.length + this.limit) - this.topLevelComments.size
        let sliceTill = this.length + this.limit - (difference > 0 ? difference : 0)
        let commentsToRetrieve = this.topLevelComments.docs.slice(this.length, sliceTill)
        this.length = sliceTill
        for (let comment of commentsToRetrieve) {
          let section = await retrieveChildren(this.videoRef, comment.ref)
          this.commentSection.push(section)
        }
      }
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
    avatar: function () {
      return this.$store.state.user.currentUser != null ? this.$store.state.user.currentUser.userInfo.photoURL : ''
    }
  },
  watch: {
    async videoRef (newRef, oldRef) {
      if (oldRef === undefined || oldRef == null) {
        this.topLevelComments = await retrieveTopLevelComments(newRef)
        //   let foundComments = firebase.firestore().collection('comments').where('video', '==', newRef)

        //   foundComments.onSnapshot((querySnapshot) => {
        //     var sections = []
        //     querySnapshot.forEach(async function (doc) {
        //       let data = doc.data()
        //       let user = await data.user.get()
        //       let userInfo = user.data()

        //       if (!userInfo.isGoogleAccount) {
        //         userInfo.photoURL = await firebase
        //           .storage()
        //           .ref(`profilePictures/${userInfo.photo}`)
        //           .getDownloadURL()
        //       }

        //       sections.push({
        //         uid: data.id,
        //         user: userInfo.name,
        //         avatar: userInfo.photoURL,
        //         text: data.text,
        //         commentedAt: data.commentedAt
        //       })

        //       sections.sort(function (a, b) {
        //         return b.commentedAt - a.commentedAt
        //       })
        //     })
        //     this.sections = sections
        //   })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
