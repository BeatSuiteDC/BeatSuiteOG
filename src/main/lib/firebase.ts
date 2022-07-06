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
  apiKey: "AIzaSyAVejlKZDKwQxgNCIV8l0s_kXk_cAKWg-k",
  authDomain: "beatsuite.firebaseapp.com",
  projectId: "beatsuite",
  storageBucket: "beatsuite.appspot.com",
  messagingSenderId: "821799501035",
  appId: "1:821799501035:web:1c91200c7efd3e82a612ae",
  measurementId: "G-Q07WEL3LV0",
}

type Collection = "Albums" | "Users"

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase)
const db = getFirestore(firebase)

const snapshot = (
  query: Collection,
  callback: (snap: QuerySnapshot<DocumentData>) => void
) => {
  onSnapshot(collection(db, query), callback)
}

const createDoc = async (query: Collection, payload: object) => {
  const collectionRef = collection(db, query)
  const docRef = await addDoc(collectionRef, payload)
  return { collection: query, id: docRef.id }
}

const editDoc = async (query: Collection, payload: object, id: string) => {
  const docRef = doc(db, query, id)
  await setDoc(docRef, payload)
}

export { analytics, snapshot, createDoc }

export default db
