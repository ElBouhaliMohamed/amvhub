<template>
 <div class="flex flex-row w-full" :class="{'py-2': !comment.isNested, 'mt-4': comment.isNested}">
    <span class="flex flex-col items-center">
      <router-link :to="`/channel/${user.uuid}`">
        <img :src="user.photoURL" alt="avatar" class="w-10 h-10 mr-2 rounded-full"/>
        <!-- <lazy-img :lazy-src="user.photoURL" class=""/> -->

      </router-link>
      <button v-if="children != null || comment.isNested" @click="minimized = true" class="h-full mt-2 mr-2 border-l-2 opacity-100 hover:border-gray-900" :class="{'hidden':minimized}"></button>
    </span>
    <div class="flex flex-col justify-center w-full align-center">
        <div class="flex flex-row items-center justify-start text-center">
            <router-link :to="`/channel/${user.uuid}`" class="text-sm font-medium leading-5 text-gray-900" href>{{user.name}}</router-link>
            <span class="px-2 text-lg leading-5 text-gray-500">·</span>
            <time class="text-xs leading-5 text-gray-500" v-bind:datetime="date">{{timeSince(date)}} ago</time>
            <button @click="minimized = false" class="px-2 text-gray-500 hover:text-gray-900" :class="{'hidden':!minimized}">
              <svg class="w-5 h-5 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>

        <div class="flex" :class="{'hidden':minimized}" v-html="comment.html"></div>

        <div class="flex flex-row items-center" :class="{'hidden':minimized || !isLoggedIn}">
            <button @click="giveHeart" class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="fas fa-heart" v-bind:class="{'text-red-600': alreadyGaveHeart}"></span>
                <span v-if="hearts > 0" class="px-1">{{hearts}}</span>
            </button>

            <button @click="replying = !replying" class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="fas fa-comments"></span>
            </button>

            <button @click="copyLinkToComment" class="px-2 py-1 font-bold text-gray-500 border-0 rounded-md hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900">
                <span class="fas fa-retweet"></span>
            </button>
        </div>

        <!-- answers to this comment -->
        <div class="my-2" v-if="replying && !minimized && isLoggedIn">
           <text-editor placeholder="Tell us your thoughts" :submitButton="true" submitButtonText="ANSWER" @submit="saveComment" @textChanged="updateComment" class="mb-2"></text-editor>
        </div>
        <div class="flex flex-col" :class="{'hidden':minimized}">
          <comment v-for="(child, index) in children" v-bind:key="index" :comment="child.comment" :children="child.children" />
        </div>
        <!-- section end -->

    </div>
  </div>

</template>

<script>
import textEditor from './textEditor'
import { saveComment, getRef, getUserData } from '../services/comments.service'

export default {
  name: 'comment',
  components: {
    textEditor
  },
  data () {
    return {
      replying: false,
      html: '',
      date: new Date(this.comment.commentedAt.seconds * 1000 + this.comment.commentedAt.nanoseconds / 1000000),
      user: { photoURL: '' },
      minimized: false,
      hearts: 0,
      usersThatGaveHearts: [],
      alreadyGaveHeart: false,
      commentRef: null
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
    this.hearts = this.comment.hearts
    this.usersThatGaveHearts = this.comment.usersThatGaveHearts

    if (this.isLoggedIn) {
      let uuid = this.$store.state.user.currentUser.userInfo.uuid
      if (this.usersThatGaveHearts.includes(uuid)) { // already voted
        this.alreadyGaveHeart = true
      }
    }

    this.commentRef = getRef(this.comment.uuid)
    this.commentRef.onSnapshot((doc) => {
      let data = doc.data()
      this.hearts = data.hearts
      this.usersThatGaveHearts = data.usersThatGaveHearts

      if (this.isLoggedIn) {
        let uuid = this.$store.state.user.currentUser.userInfo.uuid
        if (this.usersThatGaveHearts.includes(uuid)) { // already voted
          this.alreadyGaveHeart = true
        } else {
          this.alreadyGaveHeart = false
        }
      }
    })
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    }
  },
  methods: {
    copyLinkToComment () {
      if (this.$clipboard(window.location.protocol + window.location.hostname + ':' + window.location.port + `/video/${this.comment.video.id}/${this.comment.uuid}`)) {
        console.log('copied to clipboard')
      } else {
        console.log('failed copying link')
      }
    },
    giveHeart () {
      if (this.isLoggedIn) {
        let uuid = this.$store.state.user.currentUser.currentUser.uid
        if (this.alreadyGaveHeart) {
          let index = this.usersThatGaveHearts.findIndex((element) => {
            return element === uuid
          })
          this.usersThatGaveHearts.splice(index, 1)
          this.hearts--
          this.commentRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = false
        } else { // not voted yet
          this.usersThatGaveHearts.push(uuid)
          this.hearts++
          this.commentRef.update({
            usersThatGaveHearts: this.usersThatGaveHearts,
            hearts: this.hearts
          })
          this.alreadyGaveHeart = true
        }
      }
    },
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
