<script setup>
import {useGeneralStore} from '../stores/general'
import {onBeforeMount, onMounted, ref} from 'vue'
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import {useModalStore} from '../stores/modal'

const store = useGeneralStore()
const storeModal = useModalStore()

const news = ref([])

const activeLanguage = 'ua'

onBeforeMount(() => {
  store.isLoading = false
})

async function getNews() {
  const querySnapshot = await getDocs(collection(db, "news"));
  news.value = []

  querySnapshot.forEach((doc) => {
    news.value.push(doc.data())
  });
}

function deleteNews(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "news", id));
        await getNews()
        store.isLoading = false
      })
}

function getStatusLabel(status) {
  return status ? 'ВКЛ' : 'ВИКЛ'
}

onMounted(async() => {
  await getNews()
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
        <h2 class="text-center">Список Новин</h2>
      </div>

      <router-link :to="{name: 'admin-news-page'}" class="btn btn-info mb-4">Створити новину</router-link>
    </div>

    <table class="table" v-if="news.length">
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
      <tr v-for="(newsItem, newsIndex) in news">
        <th scope="row">{{ newsIndex + 1 }}</th>
        <td>{{ newsItem[activeLanguage].name }}</td>
        <td>{{ newsItem.publication_date }}</td>
        <td>{{ getStatusLabel(newsItem.active) }}</td>
        <td>
          <router-link :to="{name: 'admin-news-page', params: {id: newsItem.id}}">
            <i class="fa-solid fa-pen"></i>
          </router-link>
        </td>
        <td>
          <button @click="deleteNews(newsItem.id)" type="button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </template>
</template>