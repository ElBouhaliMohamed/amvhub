<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit" class="flex flex-col items-center justify-center w-full pl-8 overflow-hidden align-center" id="suggested">
    <div class="flex flex-row justify-start w-full mb-3" v-for="video in currentRecommendations" v-bind:key="video.id">

      <div class="w-1/4 lg:w-1/2">
        <router-link :to="`/video/${video.uuid}`">
          <div class="relative aspect-ratio-16/9">
            <img class="absolute object-cover w-full h-full transition-all duration-200 ease-in-out transform hover:scale-70" :src="video.thumbnail"/>
          </div>
          </router-link>
      </div>

      <div class="flex flex-col w-1/2 pl-2"> <!-- video infos here -->
        <router-link :to="`/video/${video.uuid}`">
          <span class="text-lg font-semibold leading-4 text-gray-900">{{video.title}}</span>
        </router-link>
        <router-link v-if="!video.editors.map(e => e.name).includes(video.user.name)" :to="`/channel/${video.user.uuid}`">
          <span class="flex items-center text-xs font-medium leading-6 text-gray-900">
            <!-- <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg> -->
            {{video.user.name}}
          </span>
        </router-link>
        <span v-if="video.editors.length > 0" class="flex text-xs font-medium leading-6 text-gray-900 break-all">
          <!-- <svg v-if="video.editors.length > 1" class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
          <svg v-else class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg> -->
          <p class="mr-1" v-if="video.editors.length > 1">Editors:</p>
          <p class="mr-1" v-else>Editor:</p>
          {{video.editors.map(e => e.name).join(', ')}}
        </span>
        <span class="flex flex-row text-xs leading-5">
          <span class="views">{{video.views}} views</span>
          <time v-bind:datetime="video.date[0]">{{timeSince(video.date[1])}} ago</time>
        </span>
      </div>

    </div>

    <loadingAnimation v-if="busy" class="w-4 h-4 mb-4"></loadingAnimation>

  </div>
</template>

<script>
import { getDocument, getDocumentFromSubcollection, queryCollection, querySubcollectionWithParams } from './../services/firebase.functions.service'

export default {
  data: function () {
    return {
      canLoad: false,
      limit: 5,
      busy: false,
      currentRecommendations: [],
      lastItemUid: '',
      indexCounter: 1,
      reachedEndOfTimeline: false
    }
  },
  components: {
    loadingAnimation: () => ({
      component: import('./loadingAnimation2')
    })
  },
  mounted () {
    // this.clearRecommendations()
    this.canLoad = true
    this.loadOnStartUp()
  },
  methods: {
    async fetchRecommendation (uuid) {
      try {
        let recommendationsCollection = null
        if (this.$isLoggedIn) {
          if (this.lastItemUid === '') {
            recommendationsCollection = await querySubcollectionWithParams('users', 'recommendations', uuid, ['score', 'desc'], 5)
          } else {
            let lastItem = await getDocumentFromSubcollection('users', 'recommendations', uuid, this.lastItemUid)
            recommendationsCollection = await querySubcollectionWithParams('users', 'recommendations', uuid, ['score', 'desc'], 5, lastItem)
          }
        } else {
          if (this.lastItemUid === '') {
            recommendationsCollection = await queryCollection('recommendations', null, 5, ['score', 'desc'])
          } else {
            let lastItem = await getDocument('recommendations', this.lastItemUid)
            recommendationsCollection = await queryCollection('recommendations', null, 5, ['score', 'desc'], lastItem)
          }
        }
    
        if (recommendationsCollection.docs.length === 0) {
          this.reachedEndOfTimeline = true
          return { success: true }
        }

        this.lastItemUid = recommendationsCollection.docs[recommendationsCollection.docs.length - 1].id

        let index = this.indexCounter
        for (let entry of recommendationsCollection.docs) {
          let data = entry.data()
          let createdAt = this.toDateTime(data.createdAt._seconds)

          let thumbnailsQuery = await getDocument('thumbnails', data.uuid)
          let thumbnails = thumbnailsQuery.data()
          let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

          let userSnapshot = await getDocument('users', data.user.uuid)
          let userData = userSnapshot.data()

          // let editors = Array.from(data.editors, editor => editor.name)

          this.currentRecommendations.push({
            id: index,
            editors: data.editors,
            title: data.title,
            uuid: data.uuid,
            views: data.views,
            date: [createdAt.toISOString(), createdAt.toGMTString()],
            thumbnail: currThumbnail,
            user: userData,
            description: data.description
          })

          index++
        }
        this.indexCounter = index

        return { success: true }
      } catch (err) {
        return { success: false, error: err }
      }
    },
    loadMore () {
      if (!this.reachedEndOfTimeline && this.canLoad && !this.busy) {
        this.busy = true
        this.fetchRecommendation(this.$currentUser.userInfo.uuid).then((result) => {
          this.busy = false
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    loadOnStartUp () {
      this.busy = true
      this.fetchRecommendation(this.$currentUser.userInfo.uuid).then((result) => {
        this.busy = false
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    clearRecommendations () {
      this.currentRecommendations = []
      this.lastItemUid = ''
      this.indexCounter = 1
      this.reachedEndOfTimeline = false
    }
  }
  // watch: {
  //   $currentUser (newValue) {
  //     if (newValue.userInfo !== null) {
  //       this.canLoad = true
  //       this.loadOnStartUp()
  //     }
  //   }
  // },
  // beforeDestroy () {
  //   this.clearRecommendations()
  // }
}
</script>

<style lang="scss">
  .views:after {
    @apply text-xs opacity-50;
    content: "•";
    margin: 0 4px;
  }
</style>
