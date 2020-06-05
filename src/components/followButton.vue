<template>
  <span class="relative z-0 inline-flex shadow-sm">
      <button :disabled="!isLoggedIn" @click="follow" type="button"
      class="relative inline-flex items-center px-4 py-2 leading-5 transition duration-150 ease-in-out"
      :class="{'rounded-md text-gray-50 border border-transparent bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700':followed,
      'rounded-l-md text-gray-700 bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 disabled:cursor-not-allowed':!followed}">
        <svg class="w-5 h-5 mr-2 -ml-1" :class="{'hidden':followed, 'text-gray-400':!followed}" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
        </svg>
        <span class="text-sm font-medium uppercase " v-if="!followed">Follow</span>
        <span class="text-sm font-medium uppercase " v-else>Followed</span>
      </button>
      <span class="relative inline-flex items-center px-3 py-2 -ml-px text-sm font-medium leading-5 transition duration-150 ease-in-out focus:z-10 focus:outline-none rounded-r-md"
      :class="{'text-gray-700 bg-white border border-gray-300 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700':!followed,
      'hidden':followed}"
      >12k</span>
  </span>
</template>

<script>
import firebase from 'firebase'

export default {
  props: {
    userId: String,
    isLoggedIn: Boolean
  },
  data () {
    return {
      followed: false
    }
  },
  async mounted () {
    let followersCollection = await firebase.firestore().collection('users').doc(this.userId).collection('followers')
    let query = await followersCollection.where('uuid', '==', this.$currentUser.userInfo.uuid).get()

    if (query.empty) {
      this.followed = false
    } else {
      this.followed = true
    }
  },
  methods: {
    async follow () {
      if (this.isLoggedIn) {
        this.$Progress.start()
        if (this.followed) {
          let followersCollection = await firebase.firestore().collection('users').doc(this.userId).collection('followers')
          let followersQuery = await followersCollection.where('uuid', '==', this.$currentUser.userInfo.uuid).get()
          for (let follow of followersQuery.docs) {
            follow.ref.delete()
          }

          let followsCollection = await firebase.firestore().collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows')
          let followsQuery = await followsCollection.where('uuid', '==', this.userId).get()
          for (let follow of followsQuery.docs) {
            follow.ref.delete()
          }
          
          this.followed = false
        } else {
          // update follows collection of curr user
          let currUserRef = await firebase.firestore().collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows').doc()
          await currUserRef.set({
            uuid: this.userId // id of channel to follow
          })
          // update followers collection on this channel
          let currChannelRef = await firebase.firestore().collection('users').doc(this.userId).collection('followers').doc()
          await currChannelRef.set({
            uuid: this.$currentUser.userInfo.uuid
          })

          this.followed = true
        }
        this.$store.dispatch('feed/generate', this.$currentUser.userInfo.uuid)
        this.$Progress.finish()
      }
    }
  }
}
</script>

<style>

</style>
