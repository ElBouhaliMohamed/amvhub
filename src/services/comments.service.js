import { Timestamp } from 'firebase/firestore'
import { createDocumentReference, getDocument, getDocumentFromRef, getDocumentReference, getReference, queryCollection, retrieveURL, setDocument } from './firebase.functions.service'

export async function retrieveChildren (videoRef, parentRef) {
  let allChildren = await queryCollection(
    'comments',
    [
      ['video', '==', videoRef],
      ['isNested', '==', true],
      ['parent', '==', parentRef]
    ]
  )
  
  let commentSnapshot = await getDocumentFromRef(parentRef)
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
  const topLevelComments = await queryCollection(
    'comments',
    [
      ['video', '==', videoRef],
      ['isNested', '==', false]
    ]
  )
  return topLevelComments
}

export async function retrieveSingleComment (videoRef, uuid) {
  let comment = await queryCollection(
    'comments',
    [['video', '==', videoRef]]
  )
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
  return getDocumentReference('comments', uuid)
}

export async function getSingleComment (commentUUID) {
  let commentDoc = await getDocument('comments', commentUUID)
  let commentData = commentDoc.data()
  return commentData
}

export async function saveComment (html, userUUID, videoRef, parentRef = null) {
  let commentRef = createDocumentReference('comments')
  await setDocument(commentRef, {
    html: html,
    user: createDocumentReference('users', userUUID),
    video: videoRef,
    parent: parentRef,
    isNested: parentRef != null,
    commentedAt: Timestamp.fromDate(new Date()),
    uuid: commentRef.id,
    hearts: 0,
    usersThatGaveHearts: []
  })

  return commentRef
}

export async function getUserData (userRef) {
  let user = await getDocumentFromRef(userRef)
  let userInfo = user.data()

  if (!userInfo.isGoogleAccount) {
    const photoRef = getReference(`profilePictures/${userInfo.photo}`)
    userInfo.photoURL = await retrieveURL(photoRef)
  }

  return userInfo
}
