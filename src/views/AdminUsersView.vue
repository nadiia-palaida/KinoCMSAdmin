<script setup>
import {v4 as uuidv4} from 'uuid'

import {db} from '../firebase'
import {
  doc,
  query,
  collection,
  limit,
  getDocs,
  startAfter,
  orderBy,
  endBefore,
  deleteDoc,
  startAt,
    setDoc,
  serverTimestamp
} from 'firebase/firestore'
import {getDataCollection} from '../composables/queriesFirestore'

import {citiesOptionsList} from '../composables/cities'

import {onBeforeMount, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {useModalStore} from '../stores/modal'
import moment from 'moment'

const store = useGeneralStore()
const storeModal = useModalStore()

const users = ref({
  currentPage: 1,
  total: 2,
  items: [],
})

function getFullName(index) {
  return `${users.value.items[index].firstName} ${users.value.items[index].lastName}`
}

function getCityName(value) {
  let findItem = null

  if (typeof value === 'object') {
    findItem = citiesOptionsList.find(item => item.value === value['value'])
  }

  return findItem ? findItem.label : value
}

function deleteUser(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "users", id));

        const queryReq = query(usersRef, orderBy(USERS_ORDER_BY), startAt(lastVisible), limit(USERS_PER_PAGE))
        const documentSnapshots = await getDocs(queryReq)

        let items = []
        documentSnapshots.forEach((doc) => {
          items.push(doc.data())
        });

        users.value.items = items
        store.isLoading = false
      })
}

function createdDate(date) {
  if (date) {
    return moment(date.toDate()).format('DD.MM.YYYY');
  }
  return null
}

const USERS_PER_PAGE = 5
const USERS_ORDER_BY = 'id'
const usersRef = collection(db, "users")
let lastVisible = {}

async function getFirstUsers() {
  const first = query(usersRef, orderBy(USERS_ORDER_BY), limit(USERS_PER_PAGE))
  const documentSnapshots = await getDocs(first)

  console.log('documentSnapshots', documentSnapshots)

  documentSnapshots.forEach((doc) => {
    users.value.items.push(doc.data())
  });

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
}

async function nextPage() {
  const next = query(usersRef, orderBy(USERS_ORDER_BY), startAfter(lastVisible), limit(USERS_PER_PAGE))

  const documentSnapshots = await getDocs(next)

  let items = []
  documentSnapshots.forEach((doc) => {
    console.log('doc data', doc.data())

    items.push(doc.data())
  });

  users.value.items = items

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  // console.log('next', next)
}

async function prevPage() {
  const next = query(usersRef, orderBy(USERS_ORDER_BY), endBefore(lastVisible), limit(USERS_PER_PAGE))

  const documentSnapshots = await getDocs(next)

  let items = []
  documentSnapshots.forEach((doc) => {
    console.log('doc data', doc.data())

    items.push(doc.data())
  });

  users.value.items = items

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  // console.log('next', next)
}

onBeforeMount(async () => {
  await getFirstUsers()

  store.isLoading = false
 /* for (let i = 0; i < 30; i++) {
    const user = {
      created: serverTimestamp(),
      id: uuidv4(),
      firstName: ' Nadiia',
      lastName: 'Example',
      nick: `Nadiia-${i}`,
      email: 'example@gmail.com',
      address: 'м.Київ',
      password: '1111',
      checkPassword: '1111',
      cardNumber: 11111111111111111,
      lang: 'ua',
      gender: 'male',
      phone: '0985674581',
      birthDate: '05-25-2012',
      city: 'lviv',
    }

    await setDoc(doc(db, "users", user.id), user);
  }*/
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <!--    <pre>{{ users }}</pre>-->
    <div class="d-flex justify-content-center w-100 mb-4">
      <h2 class="text-center">Користувачі</h2>
    </div>

    <table class="table" v-if="users.items.length">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Дата реєстрації</th>
        <th scope="col">День народження</th>
        <th scope="col">Email</th>
        <th scope="col">Телефон</th>
        <th scope="col">ПІБ</th>
        <th scope="col">Псевдонім</th>
        <th scope="col">Місто</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in users.items">
        <th>{{ item.id }}</th>
        <td>{{ createdDate(item.created) }}</td>
        <td>{{ item.birthDate }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ getFullName(index) }}</td>
        <td>{{ item.nick }}</td>
        <td>{{ getCityName(item.city) }}</td>
        <td>
          <router-link :to="{name: 'admin-users-page', params: {id: item.id}}">
            <i class="fa-solid fa-pen"></i>
          </router-link>
        </td>
        <td>
          <button @click="deleteUser(item.id)" type="button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button @click="prevPage" type="button" class="page-link">Previous</button>
        </li>
        <!--        <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>-->
        <li class="page-item">
          <button @click="nextPage" type="button" class="page-link">Next</button>
        </li>
      </ul>
    </nav>
  </template>
</template>