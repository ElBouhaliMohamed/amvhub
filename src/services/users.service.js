import { firebase, firestore, auth, storage, messaging } from './firebase.service'
import store from '../store'

class UsersService {

  getCurrent () {
    return new Promise(async function (resolve, reject) {
      let currentUser = await auth.currentUser
      if (currentUser != null) {
        try {
          let userRef = await firestore
            .doc(`users/${currentUser.uid}`)
            .get()

          let userInfo = await userRef.data()

          if (userInfo.uuid === undefined) {
            await firestore
              .collection('users')
              .doc(currentUser.uid)
              .update({
                uuid: currentUser.uid
              })
          } else if (userInfo.photoURL === undefined) {
            let photoURL = await storage
              .ref(`profilePictures/${userInfo.photo}`)
              .getDownloadURL()
            await firestore
              .collection('users')
              .doc(currentUser.uid)
              .update({
                photoURL: photoURL
              })
            userInfo.photoURL = photoURL
          }

          resolve({ currentUser, userInfo })
        } catch (err) {
          reject(err)
        }
      } else {
        reject(new Error('No current User'))
      }
    })
  }

  afterLogin () {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        await store.dispatch('user/initFCM')
        await store.dispatch('user/getCurrent')
        await store.dispatch('notifications/retrieveNotifications')
        store.commit('user/SET_LOGGED_IN', true)
      } else {
        store.commit('user/SET_LOGGED_IN', false)
        store.commit('user/SET_CURRENT_USER', null)
      }
    })
  }

  initFCM () {
    messaging.requestPermission().then(function () {
      return messaging.getToken()
    }).then(async function (token) {
      let currentUser = auth.currentUser
      await firestore.collection('users').doc(currentUser.uid).update({ fcm: token })
    }).catch(function (err) {
      console.log(err)
    })

    messaging.onTokenRefresh(() => {
      messaging.getToken().then(async (refreshedToken) => {
        let currentUser = auth.currentUser
        await firestore.collection('users').doc(currentUser.uid).update({ fcm: refreshedToken })
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err)
      })
    })
  }

  login (email, password) {
    return new Promise(function (resolve, reject) {
      return auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  loginWithGoogle () {
    return new Promise(async function (resolve, reject) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        let result = await auth.signInWithPopup(provider)
        const usersRef = await firestore
          .collection('users')
          .doc(result.user.uid)
        let userSnapshoot = await usersRef.get()
        if (userSnapshoot.exists) {
          resolve(result)
        } else { // first time google sign up
          await firestore
            .collection('users')
            .doc(result.user.uid)
            .set({
              isActivated: false,
              userInfosFilled: false,
              isGoogleAccount: true,
              name: result.user.displayName,
              photoURL: result.user.photoURL,
              uuid: result.user.uid
            })

          resolve(result)
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  signUp (username, email, password, avatar, banner, about, notifications) {
    return new Promise(async function (resolve, reject) {
      try {
        let usersRef = await firestore.collection('users').get()

        usersRef.forEach((userRef) => {
          if (userRef.exists && userRef.data().name === username) {
            reject(new Error('Username is already being used!'))
          }
        })

        let result = await auth
          .createUserWithEmailAndPassword(email, password)

        if (avatar != null) {
          let storageRef = await storage.ref('profilePictures/')
          let photoRef = await storageRef.child(`${result.user.uid}`)
          await photoRef.put(avatar)
        }

        if (banner != null) {
          let storageRef = await storage.ref('profileBanners/')
          let photoRef = await storageRef.child(`${result.user.uid}`)
          await photoRef.put(banner)
        }

        let userRef = await firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            isActivated: false,
            userInfosFilled: true,
            isGoogleAccount: false,
            name: username,
            photo: result.user.uid,
            uuid: result.user.uid,
            about: about,
            notifications: notifications,
            joinedAt: firebase.firestore.Timestamp.now()
          })

        resolve(result)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}

export default new UsersService()
