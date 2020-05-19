import firebase from 'firebase'

export async function retrieveChildren (videoRef, parentRef) {
  let allChildren = await firebase.firestore().collection('comments').where('video', '==', videoRef)
    .where('isNested', '==', true)
    .where('parent', '==', parentRef)
    .get()

  let commentSnapshot = await parentRef.get()
  let comment = commentSnapshot.data()

  if (!allChildren.empty) {
    let children = []
    for (let child of allChildren.docs) {
      children.push(await retrieveChildren(videoRef, child.ref))
    }

    return { comment, children }
  } else {
    return { comment }
  }
}

export async function retrieveTopLevelComments (videoRef) {
  let topLevelComments = await firebase.firestore().collection('comments').where('video', '==', videoRef)
    .where('isNested', '==', false)
    .get()

  return topLevelComments
}

export async function retrieveComments (videoRef) { // get toplevel and retrievechildren
  let topLevelComments = await this.retrieveTopLevelComments(videoRef)

  let comments = []
  for (let comment of topLevelComments.docs) {
    comments.push(this.retrieveChildren(videoRef, comment))
  }
    
  return comments
}

export function getRef (uuid) {
  let commentRef = firebase
    .firestore()
    .collection('comments')
    .doc(uuid)

  return commentRef
}

export async function saveComment (html, userUUID, videoRef, parentRef = null) {
  let commentRef = firebase
    .firestore()
    .collection('comments')
    .doc()

  commentRef.set({
    html: html,
    user: firebase.firestore().doc(`/users/${userUUID}`),
    video: videoRef,
    parent: parentRef,
    isNested: parentRef != null,
    commentedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    uuid: commentRef.id
  })

  return commentRef
}

export function timeSince (date) {
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  var seconds = Math.floor((new Date() - date) / 1000)
  var intervalType

  var interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    intervalType = 'year'
  } else {
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      intervalType = 'month'
    } else {
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) {
        intervalType = 'day'
      } else {
        interval = Math.floor(seconds / 3600)
        if (interval >= 1) {
          intervalType = 'hour'
        } else {
          interval = Math.floor(seconds / 60)
          if (interval >= 1) {
            intervalType = 'minute'
          } else {
            interval = seconds
            intervalType = 'second'
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's'
  }

  return interval + ' ' + intervalType
}