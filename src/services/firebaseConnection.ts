import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBTqgTURwwFjOLsbbT8eVgg9rDENTG9hp0",
  authDomain: "plusanotation.firebaseapp.com",
  projectId: "plusanotation",
  storageBucket: "plusanotation.appspot.com",
  messagingSenderId: "976813509772",
  appId: "1:976813509772:web:afbdf7b5143fb8c62fbfa9"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db }