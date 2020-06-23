import store from '../store'
import firebaseConfig from './../firebaseConfig.json'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/messaging'

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()
const messaging = firebase.messaging()

messaging.onMessage((payload) => {
  console.log('got notification')
  console.log(payload)
  store.dispatch('notifications/addNotification', payload)
})

export { firebase, auth, firestore, storage, functions, messaging }
