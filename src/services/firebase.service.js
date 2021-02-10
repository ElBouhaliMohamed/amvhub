import store from '../store'
import firebaseConfig from './../firebaseConfig.json'

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import { getMessaging, onMessage } from 'firebase/messaging'

// default app initialization (with logic to prevent reinitialization)
// FYI, getApps is like firebase.apps, and getApp returns app instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const functions = getFunctions(app)
const messaging = getMessaging(app)

onMessage(messaging, (payload) => {
  console.log('got notification')
  console.log(payload)
  store.dispatch('notifications/addNotification', payload)
})

export { app, auth, firestore, storage, functions, messaging }
