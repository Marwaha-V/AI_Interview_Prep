
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBy1DMdEEga4Lmpptl_SGKqIYNqxANJufE",
    authDomain: "ai-interview-prep-76450.firebaseapp.com",
    projectId: "ai-interview-prep-76450",
    storageBucket: "ai-interview-prep-76450.firebasestorage.app",
    messagingSenderId: "1060007338287",
    appId: "1:1060007338287:web:2dcbe0ea03f58e19ab41da",
    measurementId: "G-VRV90ZP0DR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);