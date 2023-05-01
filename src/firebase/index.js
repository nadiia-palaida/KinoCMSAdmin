import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import {getStorage, ref as firebaseRef, ref, getDownloadURL, uploadBytes} from "firebase/storage";

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

async function uploadFile(url, file) {
    let downloadLink = null
    await uploadBytes(firebaseRef(storage, url), file).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
            downloadLink = downloadURL
        });
    });

    return downloadLink
}

export {db, storage, uploadFile}