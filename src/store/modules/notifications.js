import { getDocument, querySubcollection, updateDocumentInSubcollection } from './../../services/firebase.functions.service'
import { getSingleComment } from './../../services/comments.service'
import { getPropertyFromVideo, getBasicInfos } from './../../services/videos.service'

class Notification {
  constructor (uuid, actorUUID, subjectUUID, type, data, createdAt) {
    this.uuid = uuid
    this.actorUUID = actorUUID
    this.subjectUUID = subjectUUID
    this.type = type
    this.data = data
    this.actor = null
    this.createdAt = createdAt
  }
  
  async getActor () {
    let actorData = await getDocument('users', this.actorUUID)
    this.actor = actorData
  }
}

class VideoUploadNotification extends Notification {
  constructor (uuid, actorUUID, subjectUUID, videoUUID, createdAt) {
    super(uuid, actorUUID, subjectUUID, 'VideoUpload', { videoUUID }, createdAt)
  }

  async getVideo () {
    this.video = await getBasicInfos(this.data.videoUUID)
  }
}

class CommentNotification extends Notification {
  constructor (uuid, actorUUID, subjectUUID, commentUUID, createdAt) {
    super(uuid, actorUUID, subjectUUID, 'Comment', { commentUUID }, createdAt)
    this.comment = {}
    this.video = {}
  }

  async getComment () {
    this.comment = await getSingleComment(this.data.commentUUID)
    console.log(this.comment)
    let title = await getPropertyFromVideo(this.comment.video, 'title')
    this.video = {
      title,
      uuid: this.comment.video.id
    }
  }
}

class FollowNotification extends Notification {
  constructor (uuid, actorUUID, subjectUUID, createdAt) {
    super(uuid, actorUUID, subjectUUID, 'Follow', {}, createdAt)
  }
}

class NewsNotification extends Notification {
  constructor (uuid, subjectUUID, title, body, url, createdAt) {
    super(uuid, '', subjectUUID, 'News', { title, body, url }, createdAt)
  }
}

const createNotificationByType = async (uuid, actorUUID, subjectUUID, type, data, createdAt) => {
  var notification = null
  switch (type) {
    case 'VideoUpload':
      notification = new VideoUploadNotification(uuid, actorUUID, subjectUUID, data.videoUUID, createdAt)
      await notification.getActor()
      await notification.getVideo()
      return notification
    case 'Comment':
      notification = new CommentNotification(uuid, actorUUID, subjectUUID, data.commentUUID, createdAt)
      await notification.getActor()
      await notification.getComment()
      return notification
    case 'Follow':
      notification = new FollowNotification(uuid, actorUUID, subjectUUID, createdAt)
      await notification.getActor()
      return notification
    case 'News':
      notification = new NewsNotification(uuid, subjectUUID, data.title, data.body, data.url, createdAt)
      return notification
    default:
      notification = new Notification(uuid, actorUUID, subjectUUID, type, createdAt)
      await notification.getActor()
      return notification
  }
}

const getDefaultState = () => {
  return {
    queue: []
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    clearQueue: (state) => {
      Object.assign(state, getDefaultState())
    },
    pushEntry (state, entry) {
      state.queue.push(entry)
    },
    removeEntryByUUID (state, uuid) {
      var index = state.queue.findIndex((e) => e.uuid === uuid)
      state.queue.splice(index, 1)
    }
  },
  actions: {
    async retrieveNotifications ({ commit, state, rootState }) {
      commit('clearQueue')

      let userUUID = rootState.user.currentUser.userInfo.uuid
      let notificationCollection = await querySubcollection('users', 'notifications', userUUID, ['active', '==', true])

      for (let notification of notificationCollection.docs) {
        var data = notification.data()
        var entry = await createNotificationByType(notification.id, data.actorUUID, data.subjectUUID, data.type, data.data, JSON.parse(data.createdAt))
        commit('pushEntry', entry)
      }

      console.log(state.queue)
    },
    async addNotification ({ commit, state }, payload) {
      let entry = await createNotificationByType(payload.data.uuid, payload.data.actorUUID, payload.data.subjectUUID, payload.data.type, JSON.parse(payload.data.data), JSON.parse(payload.data.createdAt))
      commit('pushEntry', entry)
      console.log(state.queue)
    },
    async removeNotification ({ commit, rootState }, uuid) {
      let userUUID = rootState.user.currentUser.userInfo.uuid
      await updateDocumentInSubcollection('users', 'notifications', userUUID, uuid, { active: false })
      commit('removeEntryByUUID', uuid)
    }
  }
}
