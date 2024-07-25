// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX9dupdV7A_ghqcTvZrfpKPJlVr2SODX8",
  authDomain: "carepulse-5ed3c.firebaseapp.com",
  projectId: "carepulse-5ed3c",
  storageBucket: "carepulse-5ed3c.appspot.com",
  messagingSenderId: "875014590839",
  appId: "1:875014590839:web:c987506d4d73a92282d172",
  measurementId: "G-LMW84T98NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);