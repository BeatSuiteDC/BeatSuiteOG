// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVejlKZDKwQxgNCIV8l0s_kXk_cAKWg-k",
  authDomain: "beatsuite.firebaseapp.com",
  projectId: "beatsuite",
  storageBucket: "beatsuite.appspot.com",
  messagingSenderId: "821799501035",
  appId: "1:821799501035:web:1c91200c7efd3e82a612ae",
  measurementId: "G-Q07WEL3LV0",
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase)

export { firebase, analytics }
