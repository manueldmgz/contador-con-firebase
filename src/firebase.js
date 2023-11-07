import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCz2UP7nSthhdvJTIsxoJ7ZtzGpmSHm6B8",
    authDomain: "test-project-d2ec5.firebaseapp.com",
    projectId: "test-project-d2ec5",
    storageBucket: "test-project-d2ec5.appspot.com",
    messagingSenderId: "127130484177",
    appId: "1:127130484177:web:dc787030fee5036de434f0"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)