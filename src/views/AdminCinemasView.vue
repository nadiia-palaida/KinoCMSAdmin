<script setup>
import CinemaCard from '../components/cinemas/CinemaCard.vue'

import {deleteDoc, doc} from 'firebase/firestore'
import {db} from '../firebase'
import {useModalStore} from '../stores/modal'

import {ref, onBeforeMount} from 'vue'
import {useGeneralStore} from '../stores/general'
import {getDataCollection} from '../composables/queriesFirestore'

const store = useGeneralStore()
const storeModal = useModalStore()

const cinemas = ref([])

function canDelete(index) {
  return index !== 0
}

function deleteItem(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "cinemas", id));
        cinemas.value = await getDataCollection('cinemas')
        store.isLoading = false
      })
}

onBeforeMount(async() => {
  cinemas.value = await getDataCollection('cinemas')

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <ul v-if="cinemas.length" class="films-list d-flex flex-wrap mb-4">
      <li v-for="(item, index) in cinemas" class="films-list__item mr-4">
        <CinemaCard :cinema="item" :canDelete="canDelete(index)" @delete="deleteItem(item.id)" class="col-3"/>
      </li>
    </ul>

    <router-link :to="{name: 'admin-cinemas-page'}" class="btn btn-info mb-4">Додати кінотеатр</router-link>
  </template>
</template>