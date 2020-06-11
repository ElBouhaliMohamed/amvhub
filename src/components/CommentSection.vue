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

    <div :class="{'hidden' : length === 0}" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit" id="commentsection" class="flex flex-col p-2 rounded-md bg-gray-50">
      <comment v-for="(comments, index) in commentSection" v-bind:key="index" :comment="comments.comment" :children="comments.children" />
    </div>
  </div>
</template>

<script>
import comment from './comment'
import { saveComment, retrieveTopLevelComments, retrieveChildren, retrieveSingleComment } from '../services/comments.service'

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
    textEditor: () => ({
      component: import('./textEditor'),
      loading: {
        template: '<div class="w-full h-48 skeleton-box"></div>'
      },
      error: {
        template: '<div>Something went wrong please try again later.</div>'
      },
      delay: 100,
      timeout: 2000
    }),
    comment
  },
  props: {
    videoRef: Object,
    sharedComment: {
      type: String,
      required: false
    }
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
      console.log(this.topLevelComments.empty)
      console.log(this.topLevelComments.size)
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

        if (this.sharedComment == null) {
          this.topLevelComments = await retrieveTopLevelComments(newRef)
        } else {
          this.topLevelComments = await retrieveSingleComment(newRef, this.sharedComment)
        }

      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
