import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import {getStorage, ref as firebaseRef, ref, getDownloadURL, uploadBytes, listAll} from "firebase/storage";

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

    console.log('file', file)

    const metadata = {
        contentType: file.type,
    };

    const firebaseRefEl = firebaseRef(storage, url)

    await uploadBytes(firebaseRefEl, file, metadata).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
            downloadLink = downloadURL
        });
    });

    return downloadLink
}

async function fileExist(fileId, url) {
    const listRef = ref(storage, url);
    let isExist = false

    await listAll(listRef)
        .then((res) => {
            console.log('res.items', res.items)
            console.log('fileId', fileId)
            isExist = res.items.some(item => item.name === fileId)
            console.log('isExist in', isExist)
        });

    console.log('isExist out', isExist)
    return isExist
}

export {db, storage, uploadFile, fileExist}