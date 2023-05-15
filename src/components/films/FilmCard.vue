<script setup>
import {computed} from 'vue'

const SHOW_BY_LANGUAGE = 'ua'

const props = defineProps({
  film: {type: Object, required: true}
})

const filmItem = computed(() => {
  return {
    id: props.film.id,
    type: props.film.type,
    status: props.film.status,
    ...props.film[SHOW_BY_LANGUAGE]
  }
})
</script>

<template>
  <div class="film-card">
    <router-link :to="{name: 'admin-films-page', params: {id: filmItem.id}}">
      <div class="film-card__img-wrap mb-3">
        <img :src="filmItem.poster.file" :alt="filmItem.name" class="film-card__img">
      </div>

      <div class="text-center">{{ filmItem.name }}</div>
    </router-link>
  </div>
</template>
