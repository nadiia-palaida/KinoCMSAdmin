<script setup>
import {ref, watch} from 'vue'
import AdminInputComponent from "./AdminInputComponent.vue";
import {readFileImage} from "../../helpers/helper";
import 'toastr/build/toastr.min'

const FIELD_FILE_NAME = 'file'
const FIELD_URL_NAME = 'url'
const FIELD_TEXT_NAME = 'text'

const props = defineProps(['modelValue'])

const emit = defineEmits(['deleteImage', 'update:modelValue'])

const imageUploadRef = ref(null)

function getImgFileUrl(imgUrl) {
  return new URL(`../../assets/imgs/${imgUrl}`, import.meta.url).href
}

function getFiles(event) {
  const imgFile = event.target.files[0]
  if(imgFile) {
    onInput(imgFile, FIELD_FILE_NAME)
    readFileImage(imgFile, imageUploadRef.value)
  }
}

function onInput(value, field) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function deleteItem() {
  // toastr.info('message <button type="button" class="btn clear btn-toastr" onclick="toastr.clear()">OK</button>' , 'Studio Message:');
  emit('deleteImage')
}
</script>

<template>
  <div class="image-upload">
    <div class="image-upload__cross-btn-wrap">
      <button @click="deleteItem" type="button" class="image-upload__cross-btn cross-btn">
        <i class="fa-solid fa-circle-xmark fa-xl" style="color: #eb0000;"></i>
      </button>
    </div>

    <div>
      <label class="image-upload__label">
        <div class="image-upload__img-wrap rounded border border-secondary mb-2">
          <i v-show="!modelValue.file" class="fa-solid fa-image"></i>

          <img v-show="modelValue.file" :src="modelValue.file" ref="imageUploadRef" alt="Upload image" class="image-upload__img">
        </div>

        <input @change="getFiles" type="file" accept="image/png, image/jpeg" class="image-upload__input">

        <div class="btn btn-secondary w-100">Додати</div>
      </label>

      <AdminInputComponent :modelValue="modelValue.url" @input="onInput($event.target.value, FIELD_URL_NAME)" name="film-url" label="URL"/>

      <AdminInputComponent :modelValue="modelValue.text" @input="onInput($event.target.value, FIELD_TEXT_NAME)" name="film-text" label="Text"/>
    </div>
  </div>
</template>