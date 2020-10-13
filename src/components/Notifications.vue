<template>
    <div v-on-clickaway="close" class="relative">
      <div class="flex items-center">
        <button @click="open = !open" class="relative mr-4 text-gray-400 transition-all duration-500 ease-in-out border-2 border-transparent rounded-full hover:text-gray-300 focus:outline-none">
          <notification-bell
              :size="21"
              :count="notifications.length"
              counterLocation="upperRight"
              counterStyle="roundRectangle"
              counterBackgroundColor="#FF0000"
              counterTextColor="#FFFFFF"
              iconColor="#e2e8f0"
          />
        </button>
      </div>

      <transition
          enter-active-class="duration-100 ease-out"
          enter-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="duration-100 ease-in"
          leave-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
      >
      <div id="notifications" v-show="open" class="absolute right-0 mt-2 origin-top-right transform rounded-md shadow-lg w-128">
        <div class="py-1 bg-white rounded-md shadow-xs">
          <div class="px-4 py-3">
            <div class="flex items-center justify-center">
              <span class="text-lg font-bold text-gray-900">Notifications</span>
            </div>
          </div>
          <div v-for="notification of notifications" v-bind:key="notification.uuid" class="px-4 py-3 border-t border-gray-200 group">
            <div class="flex" v-if="notification.type == 'News'">  <!-- News -->
              <div class="flex items-center justify-center w-1/4">
                <span class="w-10 h-10 p-2 bg-gray-700 rounded-full text-gray-50"></span>
              </div>
              <div class="flex flex-col w-3/4">
                <div class="text-base font-bold text-left text-gray-900">
                  <router-link class="link" :to="notification.data.url"> {{notification.data.title}} </router-link>
                </div>
                <div class="text-base text-left text-gray-700">
                  {{notification.data.body}}
                </div>
                <div class="flex justify-start pt-1">
                  <time class="text-xs leading-5 text-gray-500" v-bind:datetime="notification.createdAt">{{timeSince(notification.createdAt)}} ago</time>
                </div>
              </div>
              <div class="flex items-start justify-center">
                <button title="Close" class="ml-4 text-gray-500 transition-opacity duration-300 opacity-0 close_modal hover:text-gray-800 group-hover:opacity-100" @click="removeNotification(notification.uuid)">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex" v-else-if="notification.type == 'Follow'">  <!-- Follow -->
              <div class="flex items-center justify-center w-1/4">
                <img :src="notification.actor.photoURL" class="w-10 h-10 rounded-full"/>
              </div>
              <div class="flex flex-col w-3/4">
                <div class="text-base text-left text-gray-700">
                  <router-link class="link" :to="`/channel/${notification.actor.uuid}`">{{notification.actor.name}}</router-link> followed you!
                </div>
                <div class="flex justify-start pt-1">
                  <time class="text-xs leading-5 text-gray-500" v-bind:datetime="notification.createdAt">{{timeSince(notification.createdAt)}} ago</time>
                </div>
              </div>
              <div class="flex items-start justify-center">
                <button title="Close" class="ml-4 text-gray-500 transition-opacity duration-300 opacity-0 close_modal hover:text-gray-800 group-hover:opacity-100" @click="removeNotification(notification.uuid)">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex" v-else-if="notification.type == 'Comment'">  <!-- Comment -->
              <div class="flex items-center justify-center w-1/4">
                <img :src="notification.actor.photoURL" class="w-10 h-10 rounded-full"/>
              </div>
              <div class="flex flex-col w-3/4">
                <div class="text-base text-left text-gray-700">
                  <router-link class="link" :to="`/channel/${notification.actor.uuid}`">{{notification.actor.name}}</router-link> commented on <router-link class="link" :to="`/video/${notification.video.uuid}`" >{{notification.video.title}}</router-link> : <br/> <span class="truncate" id="quote" v-html="notification.comment.html"></span>
                </div>
                <div class="flex justify-start pt-1">
                  <time class="text-xs leading-5 text-gray-500" v-bind:datetime="notification.createdAt">{{timeSince(notification.createdAt)}} ago</time>
                </div>
              </div>
              <div class="flex items-start justify-center">
                <button title="Close" class="ml-4 text-gray-500 transition-opacity duration-300 opacity-0 close_modal hover:text-gray-800 group-hover:opacity-100" @click="removeNotification(notification.uuid)">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
            <div class="flex" v-else-if="notification.type == 'VideoUpload'">  <!-- Video -->
              <div class="flex items-center justify-center w-1/4">
                <img :src="notification.actor.photoURL" class="w-10 h-10 rounded-full"/>
              </div>
              <div class="flex flex-col w-2/4">
                <div class="text-base text-left text-gray-700">
                  <router-link class="link" :to="`/channel/${notification.actor.uuid}`">{{notification.actor.name}}</router-link> uploaded: <span class="font-bold text-gray-900">{{notification.video.title}}</span>
                </div>
                <div class="flex justify-start pt-1">
                  <time class="text-xs leading-5 text-gray-500" v-bind:datetime="notification.createdAt">{{timeSince(notification.createdAt)}} ago</time>
                </div>
              </div>
              <div class="w-1/4 mr-2">
                <div class="relative aspect-ratio-16/9">
                  <router-link class="link" :to="`/video/${notification.video.uuid}`">
                    <img :src="notification.video.thumbnail" class="absolute object-cover w-full h-full"/>
                  </router-link>
                </div>
              </div>
              <div class="flex items-start justify-center">
                <button title="Close" class="ml-4 text-gray-500 transition-opacity duration-300 opacity-0 close_modal hover:text-gray-800 group-hover:opacity-100" @click="removeNotification(notification.uuid)">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="notifications.length == 0" class="py-3 text-gray-700 border-t border-gray-200">
            No notifications received!
          </div>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>

export default {
  data () {
    return {
      open: false
    }
  },
  mounted () {
    this.$store.dispatch('notifications/retrieveNotifications')
  },
  computed: {
    notifications () {
      return this.$store.state.notifications.queue
    }
  },
  methods: {
    close () {
      this.open = false
    },
    removeNotification (uuid) {
      this.$store.dispatch('notifications/removeNotification', uuid)
    }
  },
  components: {
    NotificationBell: () => ({
      component: import('vue-notification-bell')
    })
  }
}
</script>

<style scoped>
  #quote >>> p {
    @apply bg-red-900
  }

</style>
