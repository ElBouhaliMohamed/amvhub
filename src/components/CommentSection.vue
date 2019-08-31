<template>
  <div id="comments" class="w-3/4 mx-auto">
    <div class="flex flex-col">
      <div v-if="isLoggedIn" class="flex flex-row">
        <img :src="avatar" alt="avatar" class="avatar" />
        <div class="w-full">
          <div class="flex items-center border-b border-b-2 border-primary-light py-2">
            <textarea
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="What are your thoughts"
              v-model="comment"
            />
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn" class="flex flex-row justify-end pt-2">
        <button
          class="btn btn-primary flex-shrink-0 text-sm py-1 px-2 rounded"
          type="button"
          @click="saveComment"
        >COMMENT</button>
        <button
          class="flex-shrink-0 border-transparent border-4 text-primary-light hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
          @click="cancel"
        >Cancel</button>
      </div>
    </div>

    <div id="commentsection" class="flex flex-col bg-white-dark p-2">
      <!-- <div class="flex flex-row mb-2">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <span class="border-l-2 h-full mr-2 mt-2"></span>
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-start items-center text-center">
            <a class="text-sm" href>Kazumoe</a>
            <span class="text-xs pl-2" href>@Kazumoe</span>
            <span class="text-xs px-4">&#8226;</span>
            <span class="text-sm font-thin">8 hours ago</span>
          </div>

          <div
            class="flex"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

          <div class="flex flex-row pt-2 items-center">
            <button class="rounded-full hover:bg-white p-2">
              <span class="px-1">6</span>
              <span class="fas fa-heart"></span>
            </button>

            <button class="rounded-full hover:bg-white p-2">
              <span class="px-1">2</span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="rounded-full hover:bg-white p-2">
              <span class="fas fa-retweet"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row mb-2">
        <span class="flex flex-col items-center">
          <img src="@/assets/avatar.jpg" alt="avatar" class="avatar" />
          <span class="border-l-2 h-full mr-2 mt-2"></span>
        </span>

        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-start items-center text-center">
            <a class="text-sm" href>Kazumoe</a>
            <span class="text-xs pl-2" href>@Kazumoe</span>
            <span class="text-xs px-4">&#8226;</span>
            <span class="text-sm font-thin">8 hours ago</span>
          </div>

          <div
            class="flex"
          >Lorem ipsum dolor sit amet consectetur adipisicing elitEligendi eum sint temporibus error inventore minus in porro doloribus accusantiumIpsam quam sapiente inventore, ex atque natus, necessitatibus eum eligendi asperiores consectetur harum vero obcaecati voluptatum odio? Veritatis ea cupiditate necessitatibus voluptatum, tempore voluptate iusto blanditiis cum iure similique quod libero architecto dicta aliquid soluta? Quas praesentium dolorum molestiae excepturi sed, sequi culpa cumque libero voluptate optio ullam odit! Nobis molestiae commodi tempore at numquam ullam voluptate odit dicta veritatis illum quisquam, adipisci ipsamCorporis nam dolorem accusamus, accusantium, ipsum vitae iusto expedita quidem sit error laudantium nisi modi et perferendis?</div>

          <div class="flex flex-row pt-2 items-center">
            <button class="rounded-full hover:bg-white p-2">
              <span class="px-1">3</span>
              <span class="fas fa-heart"></span>
            </button>

            <button class="rounded-full hover:bg-white p-2">
              <span class="px-1"></span>
              <span class="fas fa-comments"></span>
            </button>

            <button class="rounded-full hover:bg-white p-2">
              <span class="fas fa-retweet"></span>
            </button>
          </div>
        </div>
      </div>-->
      <div class="section mb-2 border-b-2 px-2 py-1 rounded" v-for="section in sections" :key="section.uid">
        <div class="flex flex-row justify-center align-center content-center">
          <span class="flex flex-col items-center justify-center">
            <img :src="section.avatar" alt="avatar" class="avatar" />
            <!-- <span class="border-l-2 h-full mr-2 mt-2"></span> -->
          </span>

          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start items-center text-center">
              <a class="text-sm" href>{{section.user}}</a>
              <!-- <span class="text-xs pl-2" href>@Kazumoe</span> -->
              <!-- <span class="text-xs px-4">&#8226;</span> -->
              <!-- <span class="text-sm font-thin">8 hours ago</span> -->
            </div>

            <div class="flex"> {{section.text}} </div>
            <!-- <div class="flex flex-row pt-2 items-center">
              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1">6</span>
                <span class="fas fa-heart"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
                <span class="px-1"></span>
                <span class="fas fa-comments"></span>
              </button>

              <button class="rounded-full hover:bg-white p-2">
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
import firebase from "firebase";

export default {
  data() {
    return {
      comment: "",
      sections: []
    };
  },
  props: {
    comments: Array,
    videoRef: Object
  },
  methods: {
    saveComment() {
      if (this.comment.length > 0) {
        let uid = this.$store.state.user.currentUser.currentUser.uid;
        let commentRef = firebase
          .firestore()
          .collection("comments")
          .doc();

        commentRef.set({
          text: this.comment,
          user: firebase.firestore().doc(`/users/${uid}`),
		  video: this.videoRef,
		  commentedAt: Date.now()
        });

        this.comments.push(commentRef.id);
        this.videoRef.update({
          comments: this.comments
        });

        this.comment = "";
      }
    },
    cancel() {
      this.comment = "";
    }
  },
mounted() {
    // if (this.isLoggedIn) {
    //   let uid = this.$store.state.user.currentUser.currentUser.uid;
	// }

  },
  computed: {
    isLoggedIn: function() {
      return this.$store.state.user.isLoggedIn;
	},
	avatar: function() {
      return this.$store.state.user.currentUser != null ? this.$store.state.user.currentUser.userInfo.photoURL : '';
    },
  },
  watch: {
	//   async comments() {
	// 	for(let comment in comments) {
	// 		let commentSnap = await firebase.firestore().doc(`/comments/${comment}`).get();
	// 		commentSnap.data().user
	// 	}
	//   }
	videoRef(newRef, oldRef) {
		if(oldRef == undefined || oldRef == null) {
			let foundComments = firebase.firestore().collection("comments").where("video", "==", newRef);

			foundComments.onSnapshot((querySnapshot) => {
				var sections = [];
				querySnapshot.forEach(async function(doc) {
					let data = doc.data()
					let user = await data.user.get()
					let userInfo = user.data();

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
					});

					sections.sort(function(a,b) {
						return b.commentedAt - a.commentedAt
					});
				});
				this.sections = sections;
			});
		}
	}
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  @apply .h-10 .w-10 .mr-2 .rounded-lg;
}
</style>