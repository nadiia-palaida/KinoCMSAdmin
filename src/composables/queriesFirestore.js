import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore'
import {db} from '../firebase'

export async function getItemById(path, id) {
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

export async function getDataCollection(path, condition) {
  let querySnapshot = []

  if(condition) {
    const q = query(collection(db, path), where(...condition));
    querySnapshot = await getDocs(q);
  } else {
    querySnapshot = await getDocs(collection(db, path));
  }

  let items = []
  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  });
  return items
}

