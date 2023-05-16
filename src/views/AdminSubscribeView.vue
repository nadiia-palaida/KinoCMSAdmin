<script setup>
import RadioComponent from '../components/form/RadioComponent.vue'
import TextareaComponent from '../components/form/TextareaComponent.vue'
import UsersChoose from '../components/users/UsersChoose.vue'

import {computed, onBeforeMount, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {getDataCollection} from '../composables/queriesFirestore'

const store = useGeneralStore()

const ALL_USERS = 'all'
const SOME_USERS = 'some'

const SHOW_PAGE = 'page'
const SHOW_USERS = 'users'

const CHOSE_USERS_TYPE_SMS = 'sms'
const CHOSE_USERS_TYPE_EMAIL = 'email'

const activeView = ref(SHOW_PAGE)
const activeUsersType = ref(CHOSE_USERS_TYPE_SMS)

const usersOptions = [
  {
    label: 'Всі користувачі',
    value: ALL_USERS
  },
  {
    label: 'Вибірково',
    value: SOME_USERS
  },
]

let allUsers = []

function getFullName(id) {
  const findItem = allUsers.find(item => item.id === id)

  return `${findItem.firstName} ${findItem.lastName}`
}

const smsSubscribe = ref({
  users: [],
  typeUsers: ALL_USERS,
  text: ''
})

const emailSubscribe = ref({
  users: [],
  typeUsers: ALL_USERS,
  file: {}
})

function chooseSmsUsers() {
  activeUsersType.value = CHOSE_USERS_TYPE_SMS
  activeView.value = SHOW_USERS
}

function onChangeUsers(users) {
  activeView.value = SHOW_PAGE

  if (activeUsersType.value === CHOSE_USERS_TYPE_SMS) {
    smsSubscribe.value.users = users
  } else if (activeUsersType.value === CHOSE_USERS_TYPE_EMAIL) {
    emailSubscribe.value.users = users
  }
}

function chooseEmailUsers() {
  activeUsersType.value = CHOSE_USERS_TYPE_EMAIL
  activeView.value = SHOW_USERS
}

const chosenUsers = computed(() => {
  return activeUsersType.value === CHOSE_USERS_TYPE_SMS ? smsSubscribe.value.users : emailSubscribe.value.users
})

function addFile(files) {
  if (files.length) {
    emailSubscribe.value.file = files[0]
  }
}

onBeforeMount(async () => {
  store.isLoading = false

  allUsers = await getDataCollection('users')
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div v-if="activeView === SHOW_PAGE">
      <div class="border rounded p-3 mb-4">
        <div class="d-flex justify-content-center w-100">
          <h2 class="text-center">SMS</h2>
        </div>

        <ul v-if="smsSubscribe.users.length" class="d-flex">
          <li v-for="item in smsSubscribe.users"> {{ getFullName(item) }}, &nbsp;</li>
        </ul>

        <div class="row mb-4">
          <div class="col-8">
            <div class="d-flex">
              <div class="mr-4">Вибрати користувачів яким розсилати смс</div>
              <RadioComponent v-model="smsSubscribe.typeUsers" :options="usersOptions" name="sms-subscribe-users"/>
            </div>
          </div>

          <div class="col-4">
            <button v-if="smsSubscribe.typeUsers === SOME_USERS" @click="chooseSmsUsers" class="btn btn-info">
              Вибрати користувачів
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-7">
            <div class="text-right">Символів: {{ smsSubscribe.text.length }}</div>
            <TextareaComponent v-model="smsSubscribe.text" name="sms-subscribe-text" label="Текст SMS"/>
          </div>

          <div class="col-3 offset-1">
            <div>К-сть SMS: <span class="text-info">173 629</span></div>
            <div class="d-flex justify-content-between">
              <div>Розсилка виконана на: <span class="text-info">45%</span></div>
              <div><span class="text-info">20 000</span></div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-success">Почати розсилку</button>
        </div>
      </div>

      <div class="border rounded p-3">
        <div class="d-flex justify-content-center w-100">
          <h2 class="text-center">E-mail</h2>
        </div>

        <ul v-if="emailSubscribe.users.length" class="d-flex">
          <li v-for="item in emailSubscribe.users"> {{ getFullName(item) }}, &nbsp;</li>
        </ul>

        <div class="row mb-4">
          <div class="col-8">
            <div class="d-flex">
              <div class="mr-4">Вибрати користувачів яким розсилати email</div>
              <RadioComponent v-model="emailSubscribe.typeUsers" :options="usersOptions" name="email-subscribe-users"/>
            </div>
          </div>

          <div class="col-4">
            <button v-if="emailSubscribe.typeUsers === SOME_USERS" @click="chooseEmailUsers" class="btn btn-info">
              Вибрати користувачів
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-7">
            <input @change="addFile($event.target.files)" type="file" name="email-subscribe-file" class="mb-2">

            <div class="mb-3">
              <span class="mr-3">Шаблон используемый в текущей рассылке:</span>
              <span class="text-info">{{ emailSubscribe.file.name }}</span>
            </div>

            <div class="d-flex">
              <div class="mr-4">К-сть email: <span class="text-info">173 629</span></div>
              <div class="d-flex justify-content-between">
                <div>Розсилка виконана на: <span class="text-info">45%</span></div>
              </div>
            </div>
          </div>

          <div class="col-3 offset-1">

          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-success">Почати розсилку</button>
        </div>
      </div>
    </div>

    <UsersChoose v-if="activeView === SHOW_USERS" @send="onChangeUsers" :usersArr="chosenUsers"/>
  </template>
</template>
