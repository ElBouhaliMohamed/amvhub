import { firebase, firestore, storage } from './firebase.service'

export async function thumbnailChoosen (videoId, activeId) {
  firestore.collection('thumbnails').doc(videoId).update({
    active: activeId
  })
}

export async function updateVideoInfos (videoId, infos) {
  let videoDbRef = await firestore.collection('videos').doc(videoId)
  console.log(infos)

  if (infos.creationDate != null) {
    infos.creationDate = firebase.firestore.Timestamp.fromDate(new Date(infos.creationDate))
  }

  await videoDbRef.update(infos)
}

export async function uploadThumbnail (videoId, file) {
  let customThumbnailRef = storage.ref(`thumbnails/${videoId}`).child(`thumb_${videoId}_4`)
  let snapshot = await customThumbnailRef.put(file)
  let thumbURL = await snapshot.ref.getDownloadURL()

  firestore.collection('thumbnails').doc(videoId).update({
    customThumbnail: thumbURL.toString()
  })

  return thumbURL.toString()
}

export async function uploadPoster (videoId, file) {
  let posterRef = storage.ref(`poster/${videoId}`).child(`poster_${videoId}`)
  let snapshot = await posterRef.put(file)
  let posterURL = await snapshot.ref.getDownloadURL()
  return posterURL.toString()
}

export async function getVideosForUser (uuid) {
  try {
    let userQuery = firestore.collection('users').doc(uuid)
    // let userRef = await userQuery.get()
    // let userData = userRef.data()

    let videosSnapshot = await firestore.collection('videos').where('user', '==', userQuery).get()
    let videos = []

    for (let entry of videosSnapshot.docs) {
      let data = entry.data()
      let createdAt = data.createdAt.toDate()

      let thumbnailsRef = firestore.doc(`thumbnails/${data.uuid}/`)
      let thumbnailsQuery = await thumbnailsRef.get()
      let thumbnails = thumbnailsQuery.data()
      let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

      var visibility = data.visibility === 0 ? 'Private' : (data.visibility === 1 ? 'Unlisted' : 'Public')

      videos.push({
        title: data.title,
        uuid: data.uuid,
        views: data.views,
        date: [createdAt.toISOString(), createdAt.toGMTString()],
        dateForSorting: createdAt,
        thumbnail: currThumbnail,
        hearts: data.hearts,
        visibility
      })
    }

    return { success: true, videos }
  } catch (err) {
    console.log(err)
    return { success: false, error: err }
  }
}

export async function getPoster (videoId) {
  let posterURL = await storage.ref(`poster/${videoId}`).child(`poster_${videoId}`).getDownloadURL()
  return posterURL.toString()
}

export async function getThumbnailInfos (videoId) {
  let thumbnailQueryRef = firestore.collection('thumbnails').doc(videoId)
  let thumbnailQuery = await thumbnailQueryRef.get()
  let data = thumbnailQuery.data()
  return data
}

export async function getAllVideoInfos (videoId) {
  let videoQueryRef = firestore.doc(`videos/${videoId}/`)
  let videoQuery = await videoQueryRef.get()
  let data = videoQuery.data()
  let user = await data.user.get()

  let thumbnailsRef = await firestore.doc(`thumbnails/${videoId}/`)
  let thumbnailsQuery = await thumbnailsRef.get()
  let thumbnails = thumbnailsQuery.data()
  let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

  data.user = user
  data.thumbnail = currThumbnail
  return data
}

export async function getBasicInfos (videoId) {
  let videoQueryRef = firestore.doc(`videos/${videoId}/`)
  let videoQuery = await videoQueryRef.get()
  let data = videoQuery.data()
  let user = await data.user.get()

  let thumbnailsRef = await firestore.doc(`thumbnails/${videoId}/`)
  let thumbnailsQuery = await thumbnailsRef.get()
  let thumbnails = thumbnailsQuery.data()
  let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

  return {
    title: data.title,
    thumbnail: currThumbnail,
    uuid: data.uuid,
    user
  }
}

export async function getThumbnail (videoId) {
  let thumbnailsRef = await firestore.doc(`thumbnails/${videoId}/`)
  let thumbnailsQuery = await thumbnailsRef.get()
  let thumbnails = thumbnailsQuery.data()
  let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]
  return currThumbnail
}

export async function getPropertyFromVideo (video, property) {
  let propertyData = await video.get()
  let propertyValue = propertyData.get(property)
  return propertyValue
}

export async function rateVideo (videoRef, userId, rating) {
  firestore.runTransaction(function (transaction) {
    return transaction.get(videoRef).then(function (video) {
      if (!video.exists) {
        throw 'Document does not exist!'
      }
      
      var oldRatings = video.data().ratings
      var spliceIndex = Array.from(oldRatings).findIndex(ratingObject => ratingObject.user === userId)
      var newRatings = oldRatings
      if (spliceIndex < 0) {
        oldRatings.push({ user: userId, rating: rating })
        newRatings = oldRatings
      } else {
        oldRatings.splice(spliceIndex, 1, { user: userId, rating: rating })
        newRatings = oldRatings
      }
      transaction.update(video.ref, { ratings: newRatings })
      return newRatings
    })
  }).catch(function (err) {
    console.error(err)
  })
}

export function sortMostPopular (videoArray) {
  videoArray.sort(mostPopularCompareFunction)
  return videoArray
}

export function sortNewest (videoArray) {
  videoArray.sort(newestCompareFunction)
  return videoArray
}

export function sortOldest (videoArray) {
  videoArray.sort(oldestCompareFunction)
  return videoArray
}

function mostPopularCompareFunction (a, b) {
  if (a.views === b.views) {
    return 0
  } else {
    return a.views > b.views ? -1 : 1
  }
}

function newestCompareFunction (a, b) {
  if (a.date[1] === b.date[1]) {
    return 0
  } else {
    return a.date[1] > b.date[1] ? -1 : 1
  }
}

function oldestCompareFunction (a, b) {
  if (a.date[1] === b.date[1]) {
    return 0
  } else {
    return a.date[1] < b.date[1] ? -1 : 1
  }
}
