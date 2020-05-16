<template>
  <div id="comments">
    <div class="flex flex-col">
      <div v-if="isLoggedIn" class="flex flex-row">
        <img :src="avatar" alt="avatar" class="w-10 h-10 mr-2 rounded-full" />
        <div class="w-full">
            <text-editor :submitButton="true" submitButtonText="COMMENT" @submit="saveComment" @textChanged="updateComment" class="mb-2"></text-editor>
        </div>
      </div>
    </div>

    <div id="commentsection" class="flex flex-col p-2 bg-white-dark">
      <!-- <div class="flex flex-row mb-2">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <span class="h-full mt-2 mr-2 border-l-2"></span>
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row items-center justify-start text-center">
            <a class="text-sm" href>Kazumoe</a>
            <span class="pl-2 text-xs" href>@Kazumoe</span>
            <span class="px-4 text-xs">&#8226;</span>
            <span class="text-sm font-thin">8 hours ago</span>
          </div>

          <div
            class="flex"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

          <div class="flex flex-row items-center pt-2">
            <button class="p-2 rounded-full hover:bg-white">
              <span class="px-1">6</span>
              <span class="fas fa-heart"></span>
            </button>

            <button class="p-2 rounded-full hover:bg-white">
              <span class="px-1">2</span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="p-2 rounded-full hover:bg-white">
              <span class="fas fa-retweet"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row mb-2">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <span class="h-full mt-2 mr-2 border-l-2"></span>
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row items-center justify-start text-center">
            <a class="text-sm" href>Kazumoe</a>
            <span class="pl-2 text-xs" href>@Kazumoe</span>
            <span class="px-4 text-xs">&#8226;</span>
            <span class="text-sm font-thin">8 hours ago</span>
          </div>

          <div
            class="flex"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

          <div class="flex flex-row items-center pt-2">
            <button class="p-2 rounded-full hover:bg-white">
              <span class="px-1">3</span>
              <span class="fas fa-heart"></span>
            </button>

            <button class="p-2 rounded-full hover:bg-white">
              <span class="px-1"></span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="p-2 rounded-full hover:bg-white">
              <span class="fas fa-retweet"></span>
            </button>
          </div>
        </div>
      </div>-->
      <div class="px-2 py-1 mb-2 border-b-2 rounded section" v-for="section in sections" :key="section.uid">
        <div class="flex flex-row content-center justify-center align-center">
          <span class="flex flex-col items-center justify-center">
            <img :src="section.avatar" alt="avatar" class="w-10 h-10 mr-2 rounded-full" />
            <!-- <span class="h-full mt-2 mr-2 border-l-2"></span> -->
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row items-center justify-start text-center">
              <a class="text-sm" href>{{section.user}}</a>
              <!-- <span class="pl-2 text-xs" href>@Kazumoe</span> -->
              <!-- <span class="px-4 text-xs">&#8226;</span> -->
              <!-- <span class="text-sm font-thin">8 hours ago</span> -->
            </div>

            <div class="flex" v-html="section.text"></div>
            <!-- <div class="flex flex-row items-center pt-2">
              <button class="p-2 rounded-full hover:bg-white">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="p-2 rounded-full hover:bg-white">
                <span class="px-1"></span>
                <span class="fas fa-comments"></span>
              </button>

              <button class="p-2 rounded-full hover:bg-white">
                <span class="fas fa-retweet"></span>
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import textEditor from './textEditor'

export default {
  data () {
    return {
      comment: '',
      sections: []
    }
  },
  components: {
    textEditor
  },
  props: {
    comments: Array,
    videoRef: Object
  },
  methods: {
    saveComment () {
      console.log("test")
      if (this.comment.length > 0) {
        let uid = this.$store.state.user.currentUser.currentUser.uid
        let commentRef = firebase
          .firestore()
          .collection('comments')
          .doc()

        commentRef.set({
          text: this.comment,
          user: firebase.firestore().doc(`/users/${uid}`),
          video: this.videoRef,
          commentedAt: Date.now()
        })

        this.comments.push(commentRef.id)
        this.videoRef.update({
          comments: this.comments
        })

        this.comment = ''
      }
    },
    updateComment (comment) {
      this.comment = comment
    }
  },
  mounted () {
    // if (this.isLoggedIn) {
    //   let uid = this.$store.state.user.currentUser.currentUser.uid;
    // }

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
    //   async comments() {
    // 	for(let comment in comments) {
    // 		let commentSnap = await firebase.firestore().doc(`/comments/${comment}`).get();
    // 		commentSnap.data().user
    // 	}
    //   }
    videoRef (newRef, oldRef) {
      if (oldRef == undefined || oldRef == null) {
        let foundComments = firebase.firestore().collection('comments').where('video', '==', newRef)

        foundComments.onSnapshot((querySnapshot) => {
          var sections = []
          querySnapshot.forEach(async function (doc) {
            let data = doc.data()
            let user = await data.user.get()
            let userInfo = user.data()

            if (!userInfo.isGoogleAccount) {
              userInfo.photoURL = await firebase
                .storage()
                .ref(`profilePictures/${userInfo.photo}`)
                .getDownloadURL()
            }

            sections.push({
              uid: data.id,
              user: userInfo.name,
              avatar: userInfo.photoURL,
              text: data.text,
              commentedAt: data.commentedAt
            })

            sections.sort(function (a, b) {
              return b.commentedAt - a.commentedAt
            })
          })
          this.sections = sections
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
