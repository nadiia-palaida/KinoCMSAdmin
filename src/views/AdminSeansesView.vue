<script setup>
import {db} from '../firebase'
import {doc, deleteDoc} from "firebase/firestore";
import {getDataCollection, getItemById} from '../composables/queriesFirestore'

import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {useModalStore} from '../stores/modal'

const activeLanguage = 'ua'

const store = useGeneralStore()
const storeModal = useModalStore()

const seanses = ref([])

const seansesItems = computed(() => {
  let items = [...seanses.value]

  seanses.value.forEach(async (item, index) => {
    items[index].film = await getItemById('films', item.film_id)
  })

  return items
})

function deleteSeans(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "seanses", id));
        seanses.value = await getDataCollection('seanses')
        store.isLoading = false
      })
}

onBeforeMount(async () => {
  seanses.value = await getDataCollection('seanses')
})

onMounted(() => {
  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div>
      <h4 class="text-center mb-4">Список сеансів</h4>

      <table class="table" v-if="seansesItems.length">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Назва</th>
          <th scope="col">Дата, час</th>
          <th scope="col">Тип</th>
          <th scope="col">Ціна</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(seans, seansIndex) in seansesItems">
          <th scope="row">{{ seansIndex + 1 }}</th>
          <td v-if="seans.film">{{ seans.film[activeLanguage].name }}</td>
          <td>{{ seans.date }} {{ seans.time }}</td>
          <td>{{ seans.type }}</td>
          <td>{{ seans.price }}</td>
          <td>
            <router-link :to="{name: 'admin-seans-page', params: {id: seans.id}}">
              <i class="fa-solid fa-pen"></i>
            </router-link>
          </td>
          <td>
            <button @click="deleteSeans(seans.id)" type="button">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <router-link :to="{name: 'admin-seans-page'}" class="btn btn-info mb-4">Додати сеанс</router-link>
    </div>
  </template>
</template>
