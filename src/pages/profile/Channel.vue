<template>
  <div class="min-h-screen bg-gray-50">
      <div class="relative aspect-ratio-53/9">
        <img src="@/assets/banner.jpg" class="absolute object-cover w-full h-full">
      </div>
      <div class="container relative flex items-center mx-auto">
          <img src="@/assets/avatar.jpg" alt="avatar" class="absolute w-16 h-16 ml-6 rounded-full sm:w-32 sm:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64">
      </div>
      <div class="px-8 pb-8 bg-gray-900">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              Kazumoe
            </h2>
            <div class="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
              <div class="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                </svg>
                $120k – $140k
              </div>
              <div class="flex items-center mt-2 text-sm leading-5 text-gray-300">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                Closing on January 9, 2020
              </div>
            </div>
          </div>
          <div class="flex mt-5 lg:mt-0 lg:ml-4">
            <span class="relative z-0 inline-flex shadow-sm">
              <button @click="follow" type="button" class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
                <svg class="w-5 h-5 mr-2 -ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                </svg>
                <span v-if="!followed">
                  Follow
                </span>
                <span v-else>
                  Unfollow
                </span>
              </button>
              <span class="relative inline-flex items-center px-3 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
                12k
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="bg-gray-900">
          <div class="block">
            <div class="border-b border-indigo-200">
              <nav class="flex -mb-px">
                <router-link active-class="border-b-4 border-indigo-700 text-gray-50" :to="`/channel/${userId}/videos`" class="w-1/4 px-1 py-4 text-sm font-medium leading-5 text-center text-gray-400 border-b-2 border-transparent hover:text-gray-100 hover:border-indigo-300 focus:outline-none focus:text-gray-50 focus:border-indigo-300">
                  Videos
                </router-link>
                <router-link active-class="border-b-4 border-indigo-700 text-gray-50" :to="`/channel/${userId}/test`" class="w-1/4 px-1 py-4 text-sm font-medium leading-5 text-center text-gray-400 border-b-2 border-transparent hover:text-gray-100 hover:border-indigo-300 focus:outline-none focus:text-gray-50 focus:border-indigo-300">
                  Comments
                </router-link>
                <router-link active-class="border-b-4 border-indigo-700 text-gray-50" :to="`/channel/${userId}/test2`" class="w-1/4 px-1 py-4 text-sm font-medium leading-5 text-center text-gray-400 border-b-2 border-transparent hover:text-gray-100 hover:border-indigo-300 focus:outline-none focus:text-gray-50 focus:border-indigo-300">
                  Informations
                </router-link>
              </nav>
            </div>
          </div>
      </div>

      <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  components: {
  },
  data () {
    return {
      followed: false
    }
  },
  computed: {
    userId () {
      return this.$route.params.id
    }
  },
  async mounted () {
    let followersCollection = await firebase.firestore().collection('users').doc(this.userId).collection('followers')
    let query = await followersCollection.where('uid', '==', this.$currentUser.userInfo.uuid).get()

    if (query.empty) {
      this.followed = false
    } else {
      this.followed = true
    }
  },
  methods: {
    async follow () {
      if (this.followed) {
        let followersCollection = await firebase.firestore().collection('users').doc(this.userId).collection('followers')
        let followersQuery = await followersCollection.where('uid', '==', this.$currentUser.userInfo.uuid).get()
        for (let follow of followersQuery.docs) {
          follow.ref.delete()
        }

        let followsCollection = await firebase.firestore().collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows')
        let followsQuery = await followsCollection.where('uid', '==', this.userId).get()
        for (let follow of followsQuery.docs) {
          follow.ref.delete()
        }
        
        this.followed = false
      } else {
        // update follows collection of curr user
        let currUserRef = await firebase.firestore().collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows').doc()
        await currUserRef.set({
          uid: this.userId // id of channel to follow
        })
        // update followers collection on this channel
        let currChannelRef = await firebase.firestore().collection('users').doc(this.userId).collection('followers').doc()
        await currChannelRef.set({
          uid: this.$currentUser.userInfo.uuid
        })

        this.followed = true
      }
      this.$store.dispatch('feed/generate', this.$currentUser.userInfo.uuid)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
