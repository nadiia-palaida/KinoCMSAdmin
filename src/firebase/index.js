import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import {getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject} from "firebase/storage";

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

    if(file) {
        const metadata = {
            contentType: file.type,
        };

        const firebaseRefEl = ref(storage, url)

        await uploadBytes(firebaseRefEl, file, metadata).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
                downloadLink = downloadURL
            });
        });
    }

    return downloadLink
}

async function fileExist(fileId, url) {
    const listRef = ref(storage, url);
    let isExist = false

    await listAll(listRef)
        .then((res) => {
            isExist = res.items.some(item => item.name === fileId)
        });

    return isExist
}


function deleteOldImage(fileId, refUrl) {
    const desertRef = ref(storage, `${refUrl}/${fileId}`);
    deleteObject(desertRef).then(() => {
        // File deleted successfully
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}

export {db, storage, uploadFile, fileExist, deleteOldImage}