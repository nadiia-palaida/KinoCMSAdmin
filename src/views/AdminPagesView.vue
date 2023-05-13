<script setup>
import {useGeneralStore} from '../stores/general'
import {onBeforeMount, onMounted, ref} from 'vue'
import {collection, deleteDoc, doc, getDocs, setDoc, serverTimestamp, orderBy, query} from 'firebase/firestore'
import {db} from '../firebase'
import {useModalStore} from '../stores/modal'
import moment from 'moment'

const MAIN_PAGE_NAME = 'main'
const CONTACTS_PAGE_NAME = 'contacts'
const CAFE_PAGE_NAME = 'cafe'

const store = useGeneralStore()
const storeModal = useModalStore()

const pages = ref([])

const activeLanguage = 'ua'

onBeforeMount(() => {
  store.isLoading = false
})

async function getPages() {
  const querySnapshot = await getDocs(collection(db, "pages"));
  pages.value = []

  querySnapshot.forEach((doc) => {
    pages.value.push(doc.data())
  });
}

function deletePage(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "pages", id));
        await getPages()
        store.isLoading = false
      })
}

function getStatusLabel(status) {
  return status ? 'ВКЛ' : 'ВИКЛ'
}

function createdDate(date) {
  if(date) {
    return moment(date.toDate()).format( 'DD.MM.YYYY');
  } return null
}

function getPageRouteName(id) {
  let activeRouteName = null

  switch (id) {
    case MAIN_PAGE_NAME:
      activeRouteName = 'admin-pages-main'
      break;
    case CONTACTS_PAGE_NAME:
      activeRouteName = 'admin-pages-contacts'
      break;
    case CAFE_PAGE_NAME:
      activeRouteName = 'admin-pages-cafe'
      break;
    default:
      activeRouteName = 'admin-pages-default'
  }

  return activeRouteName
}

onMounted(async () => {
  await getPages()
  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div class="d-flex justify-content-between">
      <div class="d-flex justify-content-center w-100">
        <h2 class="text-center">Список Сторінок</h2>
      </div>

      <router-link :to="{name: 'admin-pages-default'}" class="btn btn-info mb-4">Створити сторінку</router-link>
    </div>

    <table class="table" v-if="pages.length">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Назва</th>
        <th scope="col">Дата створення</th>
        <th scope="col">Статус</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(page, pageIndex) in pages">
        <th scope="row">{{ pageIndex + 1 }}</th>
        <td>{{ page[activeLanguage].name }}</td>
        <td>{{ createdDate(page.created) }}</td>
        <td>{{ getStatusLabel(page.active) }}</td>
        <td>
          <router-link :to="{name: getPageRouteName(page.id), params: {id: page.id}}">
            <i class="fa-solid fa-pen"></i>
          </router-link>
        </td>
        <td>
          <button v-if="page.canDelete" @click="deletePage(page.id)" type="button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </template>
</template>