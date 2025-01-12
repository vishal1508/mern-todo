// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-4508d.firebaseapp.com",
  projectId: "mern-blog-4508d",
  storageBucket: "mern-blog-4508d.firebasestorage.app",
  messagingSenderId: "282274076645",
  appId: "1:282274076645:web:7178c1cd2b8ae0c35dc10c",
  measurementId: "G-9HJ20DF155",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth service
const auth = getAuth(app);

export { app, auth };
