// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlTan8mn_59X5ZqZXugwO5ZPet7MhlKx8",
  authDomain: "mentorspark-4f229.firebaseapp.com",
  projectId: "mentorspark-4f229",
  storageBucket: "mentorspark-4f229.appspot.com",
  messagingSenderId: "797549421847",
  appId: "1:797549421847:web:9f9aa664f88104ace60352",
  measurementId: "G-8W8V5HP230",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and GoogleAuthProvider so you can use them in other files
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
