<script setup>
import {ref} from 'vue'
import AdminInputComponent from "./AdminInputComponent.vue";

const image = ref({
  src: null,
  url: '',
  text: ''
})
</script>

<template>
  <div class="image-upload">
    <label class="image-upload__label">
      <div class="image-upload__img-wrap rounded border border-secondary mb-2">
        <i v-if="!image.src" class="fa-solid fa-image"></i>

        <img v-else :src="image.src" alt="Upload image" class="image-upload__img">
      </div>

      <input type="file" accept="image/png, image/jpeg" class="image-upload__input">

      <button class="btn btn-secondary w-100">Добавить</button>
    </label>

    <AdminInputComponent v-model="image.url" name="film-url" label="URL"/>

    <AdminInputComponent v-model="image.text" name="film-text" label="Text"/>
  </div>
</template>