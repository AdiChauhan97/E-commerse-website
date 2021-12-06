import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCQG0KNbUs93Rah7NVzifcG1eo7SJK6RkA",
    authDomain: "clone-website-50073.firebaseapp.com",
    projectId: "clone-website-50073",
    storageBucket: "clone-website-50073.appspot.com",
    messagingSenderId: "1079939276037",
    appId: "1:1079939276037:web:5e649d69ebeca113952b6c"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};