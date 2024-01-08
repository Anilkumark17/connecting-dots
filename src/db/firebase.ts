// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqzWIR_0__3IbvKrrTHdrR17FNLklpxh4",
  authDomain: "connecting-dots-18fcd.firebaseapp.com",
  projectId: "connecting-dots-18fcd",
  storageBucket: "connecting-dots-18fcd.appspot.com",
  messagingSenderId: "845175113456",
  appId: "1:845175113456:web:71610a9116a1ee1572e435",
  measurementId: "G-HLTN4EBH4M"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
