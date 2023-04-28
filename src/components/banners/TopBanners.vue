<script setup>
import {useIsFormValid, useValidateForm, Form} from "vee-validate"
import InputComponent from "../form/AdminInputComponent.vue"
import ImageUpload from "../form/ImageUpload.vue"

import {ref} from 'vue'

const topBanners = ref({
  show: true,
  bannersList: [],
  moveSpeed: 0
})

function uploadTopBanner(banner, index) {
  if (topBanners.value.bannersList[index]) {
    topBanners.value.bannersList[index] = banner
  } else {
    topBanners.value.bannersList.push(banner)
  }
}

function addTopBanner() {
  topBanners.value.bannersList.push({
    file: '',
    url: '',
    text: ''
  })
}

function deleteTopBanner(index) {
  topBanners.value.bannersList.splice(index, 1)
}
</script>

<template>
  <section class="admin__section">
    <h2 class="text-center mb-4">На главной верх</h2>

    <div class="admin__block shadow-lg rounded p-3">
      <div class="admin__switch-wrap">
        <div class="custom-control custom-switch custom-switch-lg admin__switch ml-auto">
          <input type="checkbox" class="custom-control-input" id="customSwitch1">
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>

      <div class="mb-4">Размер: 1000х190</div>

      <Form>
        <button type="button" @click="addTopBanner" class="btn btn-info mb-4">Добавить фото</button>

        <div class="admin__form-images mb-2">
          <template v-if="topBanners.bannersList">
            <ImageUpload v-for="(item, index) in topBanners.bannersList" v-model:modelValue="topBanners.bannersList[index]" @deleteImage="deleteTopBanner(index)"
                         class="mr-4 mb-4" :key="`top-banner-image-${index}`"/>
          </template>
        </div>
      </Form>
    </div>
  </section>
</template>
