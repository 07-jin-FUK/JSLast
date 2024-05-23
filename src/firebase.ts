// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL0Mk4y-PCLNv1lSi8pNH8NPYts41mwTo",
    authDomain: "save-1fcc0.firebaseapp.com",
    projectId: "save-1fcc0",
    storageBucket: "save-1fcc0.appspot.com",
    messagingSenderId: "940558153116",
    appId: "1:940558153116:web:928b2ecf70d9c6540e8459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
