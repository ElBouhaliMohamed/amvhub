import { firestore, storage } from './firebase.service'
import { doc, collection, Timestamp, updateDoc, getDoc, getDocs, query, where, runTransaction } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export async function thumbnailChoosen (videoId, activeId) {
  const thumbnailRef = await doc(collection(storage, 'thumbnails'), videoId)
  await updateDoc(thumbnailRef, {
    active: activeId
  })
}

export async function updateVideoInfos (videoId, infos) {
  let videoDbRef = await doc(collection(firestore, 'videos'), videoId)
  console.log(infos)

  if (infos.creationDate != null) {
    infos.creationDate = Timestamp.fromDate(new Date(infos.creationDate))
  }

  await updateDoc(videoDbRef, infos)
}

export async function uploadThumbnail (videoId, file) {
  let customThumbnailRef = ref(`thumbnails/${videoId}/thumb_${videoId}_4`)
  await uploadBytes(customThumbnailRef, file)
  let thumbURL = await getDownloadURL(customThumbnailRef)

  const thumbnailRef = doc(collection(storage, 'thumbnails'), videoId)
  updateDoc(thumbnailRef, {
    customThumbnail: thumbURL.toString()
  })

  return thumbURL.toString()
}

export async function uploadPoster (videoId, file) {
  let posterRef = ref(`poster/${videoId}` / `poster_${videoId}`)
  await uploadBytes(file)
  let posterURL = await getDownloadURL(posterRef)
  return posterURL.toString()
}

export async function getVideosForUser (uuid) {
  try {
    let userQuery = doc(collection(firestore, 'users'), uuid)
    // let userRef = await userQuery.get()
    // let userData = userRef.data()

    let videosSnapshot = await getDocs(query(collection('videos'), where('user', '==', userQuery)))
    let videos = []

    for (let entry of videosSnapshot.docs) {
      let data = entry.data()
      let createdAt = data.createdAt.toDate()

      let thumbnailsRef = doc(collection('thumbnails'), data.uuid)
      let thumbnailsQuery = await getDoc(thumbnailsRef)
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
  let posterURL = await getDownloadURL(ref(`poster/${videoId}/poster_${videoId}`))
  return posterURL.toString()
}

export async function getThumbnailInfos (videoId) {
  let thumbnailQueryRef = doc(collection(firestore, 'thumbnails'), videoId)
  let thumbnailQuery = await getDoc(thumbnailQueryRef)
  let data = thumbnailQuery.data()
  return data
}

export async function getAllVideoInfos (videoId) {
  let videoQueryRef = doc(collection(firestore, 'videos'), videoId)
  let videoQuery = await getDoc(videoQueryRef)
  let data = videoQuery.data()
  let user = await getDoc(data.user)

  let thumbnailsRef = doc(collection(firestore, 'thumbnails'), videoId)
  let thumbnailsQuery = await getDocs(thumbnailsRef)
  let thumbnails = thumbnailsQuery.data()
  let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]

  data.user = user
  data.thumbnail = currThumbnail
  return data
}

export async function getBasicInfos (videoId) {
  let videoQueryRef = doc(collection(firestore, 'videos'), videoId)
  let videoQuery = await getDoc(videoQueryRef)
  let data = videoQuery.data()
  let user = await getDoc(data.user)

  let thumbnailsRef = doc(collection(firestore, 'videos'), videoId)
  let thumbnailsQuery = await getDocs(thumbnailsRef)
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
  let thumbnailsRef = doc(collection(firestore, 'thumbnails'), videoId)
  let thumbnailsQuery = await getDocs(thumbnailsRef)
  let thumbnails = thumbnailsQuery.data()
  let currThumbnail = thumbnails.active > 3 ? thumbnails.customThumbnail : thumbnails.thumbnails[thumbnails.active]
  return currThumbnail
}

export async function getPropertyFromVideo (video, property) {
  let propertyData = await getDoc(video)
  let propertyValue = propertyData.get(property)
  return propertyValue
}

export async function rateVideo (videoRef, userId, rating) {
  runTransaction(firestore, function (transaction) {
    return transaction.get(videoRef).then(function (video) {
      if (!video.exists) {
        const error = {
          name: 'Not found',
          message: 'Video not found',
          toString: function () {
            return this.name + ': ' + this.message
          }
        }
        throw error
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
