// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "beatsuite.firebaseapp.com",
  projectId: "beatsuite",
  storageBucket: "beatsuite.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-Q07WEL3LV0",
}

type Collection = "Albums" | "Users"

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase)
const db = getFirestore(firebase)

export const snapshot = (
  query: Collection,
  callback: (snap: QuerySnapshot<DocumentData>) => void
) => {
  onSnapshot(collection(db, query), callback)
}

export const createDoc = async (query: Collection, payload: object) => {
  const collectionRef = collection(db, query)
  const docRef = await addDoc(collectionRef, payload)
  return { collection: query, id: docRef.id }
}

export const editDoc = async (
  query: Collection,
  payload: object,
  id: string
) => {
  const docRef = doc(db, query, id)
  await setDoc(docRef, payload)
}

export { analytics }

export default db
