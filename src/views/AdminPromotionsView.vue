<script setup>
import {db} from '../firebase'
import {deleteDoc, doc} from 'firebase/firestore'
import {getDataCollection} from '../composables/queriesFirestore'

import {onBeforeMount, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {useModalStore} from '../stores/modal'

const store = useGeneralStore()
const storeModal = useModalStore()

const promotions = ref([])

const activeLanguage = 'ua'

function deletePromotion(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "promotions", id));
        promotions.value = await getDataCollection('promotions')
        store.isLoading = false
      })
}

function getStatusLabel(status) {
  return status ? 'ВКЛ' : 'ВИКЛ'
}

onBeforeMount(async() => {
  promotions.value = await getDataCollection('promotions')
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
        <h2 class="text-center">Список акцій</h2>
      </div>

      <router-link :to="{name: 'admin-promotions-page'}" class="btn btn-info mb-4">Створити акцію</router-link>
    </div>

    <table class="table" v-if="promotions.length">
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
      <tr v-for="(promotionsItem, promotionsIndex) in promotions">
        <th scope="row">{{ promotionsIndex + 1 }}</th>
        <td>{{ promotionsItem[activeLanguage].name }}</td>
        <td>{{ promotionsItem.publication_date }}</td>
        <td>{{ getStatusLabel(promotionsItem.active) }}</td>
        <td>
          <router-link :to="{name: 'admin-promotions-page', params: {id: promotionsItem.id}}">
            <i class="fa-solid fa-pen"></i>
          </router-link>
        </td>
        <td>
          <button @click="deletePromotion(promotionsItem.id)" type="button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </template>
</template>