// JavaScript
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJuGK3Jx8LOm0aUa1bOeKmEj7yruPmsC0",
    authDomain: "iatt-end.firebaseapp.com",
    projectId: "iatt-end",
    storageBucket: "iatt-end.appspot.com",
    messagingSenderId: "1040886558644",
    appId: "1:1040886558644:web:d536a09925965680e18ce1"
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth  = getAuth(app);

export default app