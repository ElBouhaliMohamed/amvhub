import store from '../store'
import firebaseConfig from './../firebaseConfig.json'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

auth.onAuthStateChanged(user => {
  store.dispatch('user/getCurrent')
})

export { firebase, auth, firestore, storage, functions }
