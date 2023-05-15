<script setup>
import FilmCard from '../components/films/FilmCard.vue'

import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'

import {computed, onMounted, ref} from 'vue'
import {useGeneralStore} from '../stores/general'
import {getDataCollection} from '../composables/queriesFirestore'

const films = ref([])

const STATUS_TYPE_IS_SHOW = 'isShow'
const STATUS_TYPE_SHOW_SOON = 'showSoon'

const filmsIsShow = computed(() => {
  return films.value.filter(item => item.status === STATUS_TYPE_IS_SHOW)
})

const filmsShowSoon = computed(() => {
  return films.value.filter(item => item.status === STATUS_TYPE_SHOW_SOON)
})

const store = useGeneralStore()

onMounted(async () => {
  films.value = await getDataCollection('films')

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <div v-else>
    <router-link :to="{name: 'admin-films-page'}" class="btn btn-info mb-4">Додати фільм</router-link>

    <h3 class="text-center">Список фільмів в прокаті</h3>

    <ul v-if="filmsIsShow.length" class="films-list d-flex flex-wrap">
      <li v-for="item in filmsIsShow" class="films-list__item mr-4">
        <FilmCard :film="item" class="col-3"/>
      </li>
    </ul>

    <h3 class="text-center">Список фільмів, які скоро вийдуть</h3>

    <ul v-if="filmsShowSoon.length" class="films-list d-flex flex-wrap">
      <li v-for="item in filmsShowSoon" class="films-list__item mr-4">
        <FilmCard :film="item" class="col-3"/>
      </li>
    </ul>
  </div>
</template>