import { firestore, auth, storage, messaging } from './firebase.service'
import { doc, collection, getDoc, updateDoc, setDoc, query, where, Timestamp } from 'firebase/firestore'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { getToken } from 'firebase/messaging'

import store from '../store'

class UsersService {
  getCurrent () {
    return new Promise(async function (resolve, reject) {
      let currentUser = await auth.currentUser
      if (currentUser != null) {
        try {
          let userRef = await getDoc(doc(collection(firestore, 'users'), currentUser.uid))

          let userInfo = await userRef.data()

          if (userInfo.uuid === undefined) {
            await updateDoc(doc(collection(firestore, 'users'), currentUser.uid), {
              uuid: currentUser.uid
            })
          } else if (userInfo.photoURL === undefined) {
            let photoURL = await getDownloadURL(ref(`profilePictures/${userInfo.photo}`))
            await updateDoc(doc(collection(firestore, 'users'), currentUser.uid), {
              photoURL: photoURL.toString()
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
    onAuthStateChanged(auth, async function (user) {
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
    Notification.requestPermission().then(function () {
      return getToken(messaging)
    }).then(async function (token) {
      let currentUser = auth.currentUser
      await updateDoc(doc(collection(firestore, 'users'), currentUser.uid), { fcm: token })
    }).catch(function (err) {
      console.log(err)
    })
  }

  login (email, password) {
    return new Promise(function (resolve, reject) {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  loginWithGoogle () {
    return new Promise(async function (resolve, reject) {
      try {
        const provider = new GoogleAuthProvider()
        let result = await signInWithPopup(auth, provider)
        const usersRef = doc(collection(firestore, 'users'), result.user.uid)
        let userSnapshoot = await getDoc(usersRef)
        if (userSnapshoot.exists) {
          resolve(result)
        } else { // first time google sign up
          await setDoc(doc(collection(firestore, 'users'), result.user.uid), {
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
        let doesUserWithSameNameExist = await getDoc(query(collection(firestore, 'users'),
          where('name', '==', username)
        ))

        if (doesUserWithSameNameExist.exists) {
          reject(new Error('Username is already being used!'))
        }

        let result = await createUserWithEmailAndPassword(auth, email, password)

        if (avatar != null) {
          let photoRef = await ref(storage, `profilePictures/${result.user.uid}`)
          await uploadBytes(photoRef, avatar)
        }

        if (banner != null) {
          let photoRef = ref(`profileBanners/${result.user.uid}`)
          await uploadBytes(photoRef, banner)
        }

        await setDoc(doc(collection('users'), result.user.uid), {
          isActivated: false,
          userInfosFilled: true,
          isGoogleAccount: false,
          name: username,
          photo: result.user.uid,
          uuid: result.user.uid,
          about: about,
          notifications: notifications,
          joinedAt: Timestamp.now()
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
