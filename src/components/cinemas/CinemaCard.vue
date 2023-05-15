<script setup>
import {computed} from 'vue';

const SHOW_BY_LANGUAGE = 'ua'

const props = defineProps({
  cinema: {type: Object, required: true},
  canDelete: {type: Boolean, default: true}
})

const cinemaItem = computed(() => {
  return {
    id: props.cinema.id,
    ...props.cinema[SHOW_BY_LANGUAGE]
  }
})
</script>

<template>
  <div class="film-card position-relative">
    <div class="position-relative">
      <div v-if="canDelete" class="image-upload__cross-btn-wrap">
        <button @click="$emit('delete')" type="button" class="image-upload__cross-btn cross-btn">
          <i class="fa-solid fa-circle-xmark fa-xl" style="color: #eb0000;"></i>
        </button>
      </div>

      <router-link :to="{name: 'admin-cinemas-page', params: {id: cinemaItem.id}}">
        <div class="film-card__img-wrap mb-3">
          <img :src="cinemaItem.logo.file" :alt="cinemaItem.name" class="film-card__img">
        </div>

        <div class="text-center">{{ cinemaItem.name }}</div>
      </router-link>
    </div>
  </div>
</template>
