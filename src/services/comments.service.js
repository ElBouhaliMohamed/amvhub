import { firebase, firestore } from './firebase.service'

export async function retrieveChildren (videoRef, parentRef) {
  let allChildren = await firestore.collection('comments').where('video', '==', videoRef)
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
  let topLevelComments = await firestore.collection('comments').where('video', '==', videoRef)
    .where('isNested', '==', false)
    .get()

  return topLevelComments
}

export async function retrieveSingleComment (videoRef, uuid) {
  let comment = await firestore.collection('comments').where('video', '==', videoRef)
    .where('uuid', '==', uuid)
    .get()

  return comment
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
  let commentRef = firestore
    .collection('comments')
    .doc(uuid)

  return commentRef
}

export async function saveComment (html, userUUID, videoRef, parentRef = null) {
  let commentRef = firestore
    .collection('comments')
    .doc()

  commentRef.set({
    html: html,
    user: firestore.doc(`/users/${userUUID}`),
    video: videoRef,
    parent: parentRef,
    isNested: parentRef != null,
    commentedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    uuid: commentRef.id,
    hearts: 0,
    usersThatGaveHearts: []
  })

  return commentRef
}

export async function getUserData (userRef) {
  let user = await userRef.get()
  let userInfo = user.data()

  if (!userInfo.isGoogleAccount) {
    userInfo.photoURL = await storage
      .ref(`profilePictures/${userInfo.photo}`)
      .getDownloadURL()
  }

  return userInfo
}