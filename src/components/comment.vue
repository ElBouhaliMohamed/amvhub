<template>
 <div class="flex flex-row w-full" :class="{'py-2': !comment.isNested, 'mt-2': comment.isNested}">
    <span class="flex flex-col items-center">
      <img :src="user.photoURL" alt="avatar" class="w-10 h-10 mr-2 rounded-full"/>
      <button v-if="children != null || comment.isNested" @click="minimized = true" class="h-full mt-2 mr-2 border-l-2 opacity-100 hover:border-gray-900" :class="{'hidden':minimized}"></button>
    </span>
    <div class="flex flex-col w-full">
        <div class="flex flex-row items-center justify-start text-sm font-medium leading-5 text-center text-gray-900">
            <a class="" href>{{user.name}}</a>
            <span class="px-2 text-lg text-gray-500">·</span>
            <span class="text-sm text-gray-500">{{timeSincePosted}} ago</span>
            <button @click="minimized = false" class="px-2 text-gray-500 hover:text-gray-900" :class="{'hidden':!minimized}">
              <svg class="w-5 h-5 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>

        <div class="flex" :class="{'hidden':minimized}" v-html="comment.html"></div>

        <div class="flex flex-row items-center pt-2" :class="{'hidden':minimized}">
            <button class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <!-- <span class="px-1">3</span> -->
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
        <div class="my-2" v-if="replying && !minimized">
           <text-editor placeholder="Tell us your thoughts" :submitButton="true" submitButtonText="ANSWER" @submit="saveComment" @textChanged="updateComment" class="mb-2"></text-editor>
        </div>
        <div class="flex flex-row" :class="{'hidden':minimized}">
          <comment v-for="(child, index) in children" v-bind:key="index" :comment="child.comment" :children="child.children" />
        </div>
        <!-- section end -->

    </div>
  </div>

</template>

<script>
import textEditor from './textEditor'
import { saveComment, getRef, timeSince, getUserData } from '../services/comments.service'

export default {
  name: 'comment',
  components: {
    textEditor
  },
  data () {
    return {
      replying: false,
      html: '',
      timeSincePosted: timeSince(new Date(this.comment.commentedAt.seconds * 1000 + this.comment.commentedAt.nanoseconds / 1000000)),
      user: null,
      minimized: false
    }
  },
  props: {
    comment: Object,
    children: {
      type: Array,
      Required: false
    }
  },
  async mounted () {
    this.user = await getUserData(this.comment.user)
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
