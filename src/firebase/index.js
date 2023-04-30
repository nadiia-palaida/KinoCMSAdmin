import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8tXOMSFo1yUq68GpKuE_BjDxXY-AFdGU",
    authDomain: "kinocms-460d9.firebaseapp.com",
    projectId: "kinocms-460d9",
    storageBucket: "kinocms-460d9.appspot.com",
    messagingSenderId: "774480537181",
    appId: "1:774480537181:web:015ff6fed9bae40fcb0fb4"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app)


export {db, storage}