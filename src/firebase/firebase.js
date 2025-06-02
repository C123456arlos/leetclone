// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};
// const firebaseConfig = {
//     apiKey: "AIzaSyCxXcu1dutjviZ20TUpqQakM6Iuw9bZOus",
//     authDomain: "leetclone-e232e.firebaseapp.com",
//     projectId: "leetclone-e232e",
//     storageBucket: "leetclone-e232e.firebasestorage.app",
//     messagingSenderId: "461753938285",
//     appId: "1:461753938285:web:182c1abbb61543bd25ea64"
// };

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app)
const firestore = getFirestore(app)
export { auth, firestore, app }