<script setup>
import {ref} from "vue";
import {useGeneralStore} from "../stores/general";
import {onMounted} from "vue";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import CinemaCard from "../components/cinemas/CinemaCard.vue";
import {readFileImage} from "../helpers/helper";
import {useModalStore} from "../stores/modal";

const store = useGeneralStore()
const storeModal = useModalStore()

const cinemas = ref([])

function deleteItem(id) {
  storeModal.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(async () => {
        store.isLoading = true
        await deleteDoc(doc(db, "cinemas", id));
        await getCinemas()
        store.isLoading = false
      })
}

function canDelete(index) {
  return index !== 0
}

async function getCinemas() {
  const querySnapshot = await getDocs(collection(db, "cinemas"));
  cinemas.value = []

  querySnapshot.forEach((doc) => {
    cinemas.value.push(doc.data())
  });
}

onMounted(async() => {
  await getCinemas()
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