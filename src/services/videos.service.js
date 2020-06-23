import { firestore } from './firebase.service'

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
