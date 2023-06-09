<script setup>
import InputComponent from '../components/form/InputComponent.vue'

import {v4 as uuidv4} from 'uuid'

import {db} from '../firebase'
import {doc, query, collection, limit, getDocs, orderBy, deleteDoc, startAt, where, serverTimestamp, setDoc} from 'firebase/firestore'
import {getFirstItems, nextPage, prevPage, search} from '../composables/queriesFirestore'

import {citiesOptionsList} from '../composables/cities'

import {onBeforeMount, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {useModalStore} from '../stores/modal'
import moment from 'moment'

const store = useGeneralStore()
const storeModal = useModalStore()

const users = ref({
  items: [],
})

const searchText = ref('')
const searchClickText = ref('')


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

async function nextPageFunc() {
  users.value.items = await nextPage(usersRef, USERS_ORDER_BY, USERS_PER_PAGE, "nameArr", searchClickText.value)
}

async function prevPageFunc() {
  users.value.items = await prevPage(usersRef, USERS_ORDER_BY, USERS_PER_PAGE, "nameArr", searchClickText.value)
}

async function searchUsers() {
  searchClickText.value = searchText.value

  users.value.items = await search(usersRef, "nameArr", searchClickText.value, 'id', 5)
}

function destructionString(string) {
  let strArr = []

  for(let i = 0; i < string.length; i++) {
    strArr.push(string.slice(0, i + 1))
  }

  return strArr
}

onBeforeMount(async () => {
  users.value.items = await getFirstItems(usersRef, USERS_ORDER_BY, USERS_PER_PAGE)

  store.isLoading = false
/*   for (let i = 0; i < 30; i++) {
     const user = {
       created: serverTimestamp(),
       id: uuidv4(),
       firstName: `Nadiia-${i}`,
       lastName: 'Example',
       nick: `Nadiia`,
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

     user.nameArr = destructionString(user.firstName + user.lastName),

     await setDoc(doc(db, "users", user.id), user);
   }*/
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div class="d-flex justify-content-center w-100 mb-4">
      <h2 class="text-center">Користувачі</h2>
    </div>

    <div class="d-flex justify-content-end mb-4">
      <InputComponent v-model="searchText" @keyup.enter="searchUsers" name="users-search" placeholder="Пошук" class="col-4"/>

      <div>
        <button @click="searchUsers" class="btn btn-info">Пошук</button>
      </div>
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
          <button @click="prevPageFunc" type="button" class="page-link">Previous</button>
        </li>
        <li class="page-item">
          <button @click="nextPageFunc" type="button" class="page-link">Next</button>
        </li>
      </ul>
    </nav>
  </template>
</template>