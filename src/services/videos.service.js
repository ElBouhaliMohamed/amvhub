import { firestore } from './firebase.service'

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
