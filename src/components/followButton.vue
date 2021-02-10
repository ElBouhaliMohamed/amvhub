<template>
  <span>
    <slot v-bind:followed="followed" v-bind:followersCount="followersCount" v-bind:follow="follow"></slot>
  </span>
</template>

<script>
import { createDocumentInSubcollection, querySubcollection } from './../services/firebase.functions.service'

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
    let query = await querySubcollection('users', 'followers', this.userId, ['uuid', '==', this.$currentUser.userInfo.uuid])
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
          let followersQuery = await querySubcollection('users', 'followers', this.userId, ['uuid', '==', this.$currentUser.userInfo.uuid])

          for (let follow of followersQuery.docs) {
            follow.ref.delete()
          }

          let followsQuery = await querySubcollection('users', 'follows', this.userId, ['uuid', '==', this.userId])
          for (let follow of followsQuery.docs) {
            follow.ref.delete()
          }
          
          this.followed = false
        } else {
          // update follows collection of curr user
          await createDocumentInSubcollection('users', 'follows', this.$currentUser.userInfo.uuid, {
            uuid: this.userId // id of channel to follow
          })
          
          // update followers collection on this channel
          await createDocumentInSubcollection('users', 'followers', this.userId, {
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
