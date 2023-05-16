import {collection, doc, endBefore, getDoc, getDocs, limit, orderBy, query, startAfter, where} from 'firebase/firestore'
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

  if (condition) {
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

//pagination

let lastVisible = {}

export async function getFirstItems(queryRef, orderByField, limitNumber) {
  lastVisible = {}

  const first = query(queryRef, orderBy(orderByField), limit(limitNumber))
  const documentSnapshots = await getDocs(first)

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return items
}

export async function nextPage(queryRef, orderByField, limitNumber, searchField, searchText) {
  let next = query(queryRef, orderBy(orderByField), startAfter(lastVisible), limit(limitNumber))

  if (searchText) {
    next = query(queryRef, where(searchField, "array-contains", searchText), orderBy(orderByField), startAfter(lastVisible), limit(limitNumber));
  }

  const documentSnapshots = await getDocs(next)

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return items
}

export async function prevPage(queryRef, orderByField, limitNumber, searchField, searchText) {
  let prev = query(queryRef, orderBy(orderByField), endBefore(lastVisible), limit(limitNumber))

  if (searchText) {
    prev = query(queryRef, where(searchField, "array-contains", searchText), orderBy(orderByField), endBefore(lastVisible), limit(limitNumber));
  }

  const documentSnapshots = await getDocs(prev)

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return items
}

export async function search(queryRef, searchField, searchText, orderByField, limitNumber) {
  const q = query(queryRef, where(searchField, "array-contains", searchText), orderBy(orderByField), limit(limitNumber));
  const documentSnapshots = await getDocs(q);

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return items
}

