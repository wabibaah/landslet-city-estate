// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvpgvTZ5IWcQ5byTUf6Q1QYjFMXElThyc",
  authDomain: "nana-boateng-project.firebaseapp.com",
  projectId: "nana-boateng-project",
  storageBucket: "nana-boateng-project.appspot.com",
  messagingSenderId: "732358545012",
  appId: "1:732358545012:web:fdba4958e5532c48f80b21",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
