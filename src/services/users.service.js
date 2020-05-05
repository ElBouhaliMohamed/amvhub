import firebase from 'firebase'
import BaseService from './base.service'
import store from '../store'

class UsersService extends BaseService {
  get entity () {
    return 'users'
  }

  getCurrent () {
    return new Promise(async function (resolve, reject) {
      let currentUser = await firebase.auth().currentUser
      if (currentUser != null) {
        try {
          let userRef = await firebase
            .firestore()
            .doc(`users/${currentUser.uid}`)
            .get()

          let userInfo = await userRef.data()

          if (userInfo.uuid === undefined) {
            await firebase
              .firestore()
              .collection('users')
              .doc(currentUser.uid)
              .update({
                uuid: currentUser.uid
              })
          }

          if (!userInfo.isGoogleAccount) {
            userInfo.photoURL = await firebase
              .storage()
              .ref(`profilePictures/${userInfo.photo}`)
              .getDownloadURL()
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
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.commit('user/SET_LOGGED_IN', true)
        store.dispatch('user/getCurrent')
      } else {
        store.commit('user/SET_LOGGED_IN', false)
        store.commit('user/SET_CURRENT_USER', null)
      }
    })
  }

  login (email, password) {
    return new Promise(function (resolve, reject) {
      return firebase
        .auth()
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
        let result = await firebase.auth().signInWithPopup(provider)
        const usersRef = await firebase
          .firestore()
          .collection('users')
          .doc(result.user.uid)
        let userSnapshoot = await usersRef.get()
        if (userSnapshoot.exists) {
          resolve(result)
        } else { // first time google sign up
          await firebase
            .firestore()
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
        let usersRef = await firebase.firestore().collection('users').get()

        usersRef.forEach((userRef) => {
          if (userRef.exists && userRef.data().name === username) {
            reject(new Error('Username is already being used!'))
          }
        })

        let result = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        if (avatar != null) {
          let storageRef = await firebase.storage().ref('profilePictures/')
          let photoRef = await storageRef.child(`${result.user.uid}`)
          await photoRef.put(avatar)
        }

        if (banner != null) {
          let storageRef = await firebase.storage().ref('profileBanners/')
          let photoRef = await storageRef.child(`${result.user.uid}`)
          await photoRef.put(banner)
        }

        let userRef = await firebase
          .firestore()
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
