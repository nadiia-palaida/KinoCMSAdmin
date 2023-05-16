<script setup>
import InputComponent from '../../components/form/InputComponent.vue'
import CheckboxComponent from '../form/CheckboxComponent.vue'

import {useGeneralStore} from '../../stores/general'
import {onBeforeMount, ref} from 'vue'
import moment from 'moment'
import {collection} from 'firebase/firestore'
import {db} from '../../firebase'
import {getFirstItems, nextPage, prevPage, search} from '../../composables/queriesFirestore'
import {citiesOptionsList} from '../../composables/cities'

const store = useGeneralStore()

const props = defineProps({
  usersArr: {type: Array, default: []}
})

const emit = defineEmits(['send'])

const users = ref({
  items: [],
})

const usersChoosen = ref([])

const searchText = ref('')
const searchClickText = ref('')

function onChangeChosenUser(value, id) {
  if (value) {
    usersChoosen.value.push(id)
  } else {
    if (isChosen(id)) {
      usersChoosen.value = usersChoosen.value.filter(item => item !== id)
    }
  }
}

function isChosen(id) {
  return usersChoosen.value.some(item => item === id)
}

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

function createdDate(date) {
  if (date) {
    return moment(date.toDate()).format('DD.MM.YYYY');
  }
  return null
}

function sendChosenUsers() {
  emit('send', usersChoosen.value)
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


onBeforeMount(async () => {
  users.value.items = await getFirstItems(usersRef, USERS_ORDER_BY, USERS_PER_PAGE)

  usersChoosen.value = props.usersArr

  store.isLoading = false
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
        <th></th>
        <th scope="col">ID</th>
        <th scope="col">Дата реєстрації</th>
        <th scope="col">День народження</th>
        <th scope="col">Email</th>
        <th scope="col">Телефон</th>
        <th scope="col">ПІБ</th>
        <th scope="col">Псевдонім</th>
        <th scope="col">Місто</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in users.items">
        <td>
          <input type="checkbox" @change="onChangeChosenUser($event.target.checked, item.id)" :checked="isChosen(item.id)"
                 :name="`checkbox-user-subscribe-${item.id}`">
        </td>
        <td>{{ item.id }}</td>
        <td>{{ createdDate(item.created) }}</td>
        <td>{{ item.birthDate }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ getFullName(index) }}</td>
        <td>{{ item.nick }}</td>
        <td>{{ getCityName(item.city) }}</td>
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

    <div class="d-flex justify-content-center">
      <button @click="sendChosenUsers" class="btn btn-success">Відправити вибрані</button>
    </div>
  </template>
</template>
