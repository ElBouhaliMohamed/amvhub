import { functions, firestore, storage } from './firebase.service'
import { collection, doc, getDoc, getDocs, query, orderBy, limit, startAfter, where, updateDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { listAll, ref, getDownloadURL, getMetadata, uploadBytes } from 'firebase/storage'
import { httpsCallable } from 'firebase/functions'

/**
 * Firebase/functions
 */

export function callFirebaseFunction (name) {
  return httpsCallable(functions, name)
}

/**
 * Firestore functions
 */

export function getAllDocumentsFromSubcollection (collectionName, subcollection, reference) {
  const subcollectionRef = collection(doc(collection(firestore, collectionName), reference), subcollection)
  return getDocs(subcollectionRef)
}

export function getDocument (collectionName, documentId) {
  const documentRef = doc(collection(firestore, collectionName), documentId)
  return getDoc(documentRef)
}

export function getDocuments (collectionName) {
  const collectionRef = collection(firestore, collectionName)
  return getDocs(collectionRef)
}

export function getDocumentFromRef (documentRef) {
  return getDoc(documentRef)
}

export function getDocumentFromSubcollection (collectionName, subcollection, reference, documentId) {
  const documentRef = doc(collection(doc(collection(firestore, collectionName), reference), subcollection), documentId)
  return getDoc(documentRef)
}

export function querySubcollectionWithParams (collectionName, subcollection, reference, orderByParams = null, limitParam = null, startAfterParam = null) {
  const subcollectionRef = collection(doc(collection(firestore, collectionName), reference), subcollection)
  const queryParams = []
  if (orderByParams != null) {
    queryParams.push(orderBy(orderByParams[0], orderByParams[1]))
  } else if (limitParam != null) {
    queryParams.push(limit(limitParam))
  } else if (startAfterParam != null) {
    queryParams.push(startAfter(startAfterParam))
  }

  const subcollectionQuery = query(subcollectionRef, ...queryParams)
  return getDocs(subcollectionQuery)
}

export function querySubcollection (collectionName, subcollection, reference, whereParams = null) {
  const subcollectionRef = collection(doc(collection(firestore, collectionName), reference), subcollection)
  const queryParams = []
  if (whereParams != null) {
    queryParams.push(where(whereParams[0], whereParams[1], whereParams[2]))
  }

  const subcollectionQuery = query(subcollectionRef, ...queryParams)
  return getDocs(subcollectionQuery)
}

export function queryCollection (collectionName, whereParams = null, limitParam = null, orderByParams = null, startAfterParam = null) {
  const collectionRef = collection(firestore, collectionName)
  const queryParams = []
  if (whereParams != null) {
    for (let i = 0; i < whereParams.length; i++) {
      queryParams.push(where(whereParams[0][0], whereParams[0][1], whereParams[0][2]))
    }
  } else if (limitParam != null) {
    queryParams.push(limit(limitParam))
  } else if (orderByParams != null) {
    queryParams.push(orderBy(orderByParams[0], orderByParams[1]))
  } else if (startAfterParam != null) {
    queryParams.push(startAfter(startAfterParam))
  }

  const collectionQuery = query(collectionRef, ...queryParams)
  return getDocs(collectionQuery)
}

export async function updateDocument (collectionName, documentId, data) {
  const subcollectionRef = doc(collection(firestore, collectionName), documentId)
  await updateDoc(subcollectionRef, data)
}

export async function updateDocumentFromRef (ref, data) {
  await updateDoc(ref, data)
}

export async function updateDocumentInSubcollection (collectionName, subcollection, reference, documentId, data) {
  const subcollectionRef = doc(collection(doc(collection(firestore, collectionName), reference), subcollection), documentId)
  await updateDoc(subcollectionRef, data)
}

export function watchDocument (ref, onChange) {
  return onSnapshot(ref, onChange)
}

export async function createDocumentInSubcollection (collectionName, subcollection, reference, data) {
  const documentRef = doc(collection(doc(collection(firestore, collectionName), reference), subcollection))
  await setDoc(documentRef, data)
}

export async function createDocument (collectionName, data) {
  const documentRef = doc(collection(firestore, collectionName))
  await setDoc(documentRef, data)
  return documentRef
}

export async function setDocument (documentRef, data) {
  await setDoc(documentRef, data)
}

export function createDocumentReference (collectionName) {
  const documentRef = doc(collection(firestore, collectionName))
  return documentRef
}

export function getDocumentReference (collectionName, documentId) {
  return doc(collection(firestore, collectionName), documentId)
}

/**
 * Storage functions
 */

export function listAllFromRef (ref) {
  return listAll(ref)
}

export function getReference (path) {
  return ref(storage, path)
}

export function retrieveURL (ref) {
  return getDownloadURL(ref)
}

export function retrieveMetadata (ref) {
  return getMetadata(ref)
}

export function uploadFile (ref, file) {
  return uploadBytes(ref, file)
}
