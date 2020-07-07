<template>
  <span>
    <slot v-bind:followed="followed" v-bind:followersCount="followersCount" v-bind:follow="follow"></slot>
  </span>
</template>

<script>
import { firestore } from './../services/firebase.service'

export default {
  props: {
    userId: String,
    isLoggedIn: Boolean
  },
  data () {
    return {
      followed: false,
      followersCount: '12k'
    }
  },
  async mounted () {
    let followersCollection = await firestore.collection('users').doc(this.userId).collection('followers')
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
          let followersCollection = await firestore.collection('users').doc(this.userId).collection('followers')
          let followersQuery = await followersCollection.where('uuid', '==', this.$currentUser.userInfo.uuid).get()
          for (let follow of followersQuery.docs) {
            follow.ref.delete()
          }

          let followsCollection = await firestore.collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows')
          let followsQuery = await followsCollection.where('uuid', '==', this.userId).get()
          for (let follow of followsQuery.docs) {
            follow.ref.delete()
          }
          
          this.followed = false
        } else {
          // update follows collection of curr user
          let currUserRef = await firestore.collection('users').doc(this.$currentUser.userInfo.uuid).collection('follows').doc()
          await currUserRef.set({
            uuid: this.userId // id of channel to follow
          })
          // update followers collection on this channel
          let currChannelRef = await firestore.collection('users').doc(this.userId).collection('followers').doc()
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
