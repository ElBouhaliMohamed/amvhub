<template>
 <div class="flex flex-row mb-2 sm:border-t sm:border-gray-200 sm:pt-5">
    <span class="flex flex-col items-center">
      <img src="@/assets/avatar.jpg" alt="avatar" class="w-10 h-10 mr-2 rounded-full" />
      <span class="h-full mt-2 mr-2 border-l-2 opacity-75"></span>
    </span>
    <div class="flex flex-col w-full">
        <div class="flex flex-row items-center justify-start text-sm font-medium leading-5 text-center text-gray-900">
            <a class="" href>Kazumoe</a>
            <span class="px-2 text-lg text-gray-500">·</span>
            <span class="text-sm text-gray-500">{{timeSincePosted}} ago</span>
        </div>

        <div class="flex" v-html="comment.html"></div>

        <div class="flex flex-row items-center pt-2">
            <button class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="px-1">3</span>
                <span class="fas fa-heart"></span>
            </button>

            <button @click="replying = !replying" class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="fas fa-comments"></span>
            </button>

            <button class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="fas fa-retweet"></span>
            </button>
        </div>

        <!-- answers to this comment -->
        <div class="mb-2" v-if="replying">
           <text-editor placeholder="Tell us your thoughts" :submitButton="true" submitButtonText="ANSWER" @submit="saveComment" @textChanged="updateComment" class="mb-2"></text-editor>
        </div>
        <div class="flex flex-row">
          <comment v-for="(child, index) in children" v-bind:key="index" :comment="child.comment" :children="child.children" />
        </div>
        <!-- section end -->

    </div>
  </div>

</template>

<script>
import textEditor from './textEditor'
import { saveComment, getRef, timeSince } from '../services/comments.service'
import firebase from 'firebase'

export default {
  name: 'comment',
  components: {
    textEditor
  },
  data () {
    return {
      replying: false,
      html: '',
      timeSincePosted: timeSince(new Date(this.comment.commentedAt.seconds * 1000 + this.comment.commentedAt.nanoseconds / 1000000))
    }
  },
  props: {
    comment: Object,
    children: {
      type: Array,
      Required: false
    }
  },
  methods: {
    async saveComment () {
      if (this.html.length > 0) {
        let userUUID = this.$store.state.user.currentUser.userInfo.uuid
        await saveComment(this.html, userUUID, this.comment.video, getRef(this.comment.uuid))
        
        // this.comments.push(commentRef.id)
        // this.videoRef.update({
        //   comments: this.comments
        // })

        this.html = ''
      }
    },
    updateComment (html) {
      this.html = html
    }
  }
}
</script>
