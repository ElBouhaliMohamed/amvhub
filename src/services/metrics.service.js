import { firestore } from './firebase.service'
// import store from '../store'

class MetricsService {
  constructor (userUUID) {
    this.userUUID = userUUID
    this.userRef = firestore.collection('users').doc(this.userUUID)
  }

  // TODO: bundle all transactions into one -> fewer functions calls and db writes

  markVideoAsWatched (videoUUID) {
    let userDocRef = this.userRef
    if (videoUUID != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var videosWatched = userDoc.data().videosWatched
          if (videosWatched == null) {
            videosWatched = []
          }

          if (!videosWatched.includes(videoUUID)) {
            videosWatched.push(videoUUID)
          }
          transaction.update(userDocRef, { videosWatched: videosWatched })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  userLikedVideoWithSources (sources) {
    let userDocRef = this.userRef
    if (sources != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var likedSources = userDoc.data().likedSources
          if (likedSources == null) {
            likedSources = []
          }

          for (var source of sources) {
            if (!likedSources.includes(source.title)) {
              if (likedSources.length >= 20) {
                likedSources.shift()
              }
              likedSources.push(source.title)
            }
          }
          transaction.update(userDocRef, { likedAnimes: likedSources })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  userLikedVideoWithCategorys (categorys) {
    let userDocRef = this.userRef
    if (categorys != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var likedCategorys = userDoc.data().likedCategorys
          if (likedCategorys == null) {
            likedCategorys = []
          }

          for (var category of categorys) {
            if (!likedCategorys.includes(category)) {
              if (likedCategorys.length >= 5) {
                likedCategorys.shift()
              }
              likedCategorys.push(category)
            }
          }

          transaction.update(userDocRef, { likedCategorys: likedCategorys })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  userLikedVideoWithTags (tags) {
    let userDocRef = this.userRef

    if (tags != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var likedTags = userDoc.data().likedTags
          if (likedTags == null) {
            likedTags = []
          }

          for (var tag of tags) {
            if (!likedTags.includes(tag)) {
              if (likedTags.length >= 5) {
                likedTags.shift()
              }
              likedTags.push(tag)
            }
          }
          
          transaction.update(userDocRef, { likedCategorys: likedTags })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  userLikedVideoFromUser (userUUID) {
    let userDocRef = this.userRef

    if (userUUID != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var likedUsers = userDoc.data().likedUsers
          if (likedUsers == null) {
            likedUsers = []
          }

          if (!likedUsers.includes(userUUID)) {
            if (likedUsers.length >= 50) {
              likedUsers.shift()
            }
            likedUsers.push(userUUID)
          }
          transaction.update(userDocRef, { likedUsers: likedUsers })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  userLikedVideoFromEditors (editors) {
    let userDocRef = this.userRef

    if (editors != null) {
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userDocRef).then(function (userDoc) {
          if (!userDoc.exists) {
            throw 'Document does not exist!'
          }

          var likedEditors = userDoc.data().likedEditors
          if (likedEditors == null) {
            likedEditors = []
          }
          
          for (var editor of editors) {
            if (!likedEditors.includes(editor)) {
              if (likedEditors.length >= 50) {
                likedEditors.shift()
              }
              likedEditors.push(editor)
            }
          }

          transaction.update(userDocRef, { likedEditors: likedEditors })
        })
      }).then(() => {
        // console.log('"Tr"')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

export default MetricsService
