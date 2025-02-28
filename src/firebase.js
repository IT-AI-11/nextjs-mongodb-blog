



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: "AIzaSyAlcVnh1SGzc9zNhTLtlyZQI9MK8Vnas5Q",    original
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-next-mongo-firebase.firebaseapp.com",
  projectId: "blog-next-mongo-firebase",
  storageBucket: "blog-next-mongo-firebase.firebasestorage.app",
  messagingSenderId: "50369562842",
  appId: "1:50369562842:web:440557d0e583d94945fde3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);    original
 export const app = initializeApp(firebaseConfig);