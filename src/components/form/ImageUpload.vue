<script setup>
import InputComponent from './InputComponent.vue'

import '@/plugins/vee-validate'
import {v4 as uuidv4} from 'uuid'
import {readFileImage} from '../../helpers/helper'
import {createToaster} from '@meforma/vue-toaster'

import {useModalStore} from '../../stores/modal';

import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useField} from 'vee-validate'

const FIELD_FILE_NAME = 'file'
const FIELD_FILE_ID = 'fileId'
const FIELD_URL_NAME = 'url'
const FIELD_TEXT_NAME = 'text'

const props = defineProps({
  modelValue: {},
  hasUrl: {type: Boolean, default: true},
  hasText: {type: Boolean, default: true},
  name: {type: String},
  rules: {},
  errors: {type: Array},
  form: {}
})

const emit = defineEmits(['deleteImage', 'update:modelValue'])

const imageUploadRef = ref(null)

async function getFiles(event) {
  const imgFile = event.target.files[0]
  if (imgFile) {
    await onInput(imgFile, FIELD_FILE_NAME)
    await onInput(uuidv4(), FIELD_FILE_ID)
    readFileImage(imgFile, imageUploadRef.value)
  }
}

function onInput(value, field) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

const store = useModalStore()
const toaster = createToaster({ /* options */});
let canDelete = false

async function deleteItem() {
  store.openModal({
    component: 'PermissionModal',
    data: {title: 'Підтвердження видалення', text: 'Ви дійсно хочете видалити цей елемент?'}
  })
      .then(data => {
        emit('deleteImage')
        if (props.modelValue.file && typeof props.modelValue.file === 'object') {
          readFileImage(props.modelValue.file, imageUploadRef.value)
        }
      })
      .catch(data => {
      })
}

const uid = computed(() => {
  return uuidv4();
})

const imgSrc = computed(() => {
  if (props.modelValue.file && typeof props.modelValue.file === 'object') {
    readFileImage(props.modelValue.file, imageUploadRef.value)
  } else {
    return props.modelValue.file
  }
})

const {errorMessage, value} = reactive(useField(() => props.name, inputValue =>!!inputValue && !!inputValue.file));

onMounted(() => {
  if (props.modelValue.file && typeof props.modelValue.file === 'object') {
    readFileImage(props.modelValue.file, imageUploadRef.value)
  }
})
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

          <img v-show="modelValue.file" :src="imgSrc" ref="imageUploadRef" alt="Upload image"
               class="image-upload__img">
        </div>

        <input @change="getFiles" type="file" accept="image/png, image/jpeg" class="image-upload__input">

        <div class="btn btn-secondary w-100">Додати</div>

        <span v-if="errorMessage" class="input__error error">{{ errorMessage }}</span>
      </label>

      <InputComponent v-if="hasUrl" :modelValue="modelValue.url"
                      @input="onInput($event.target.value, FIELD_URL_NAME)"
                      rules="required" :name="`film-url-${uid}`" label="URL" class="mb-4"/>

      <InputComponent v-if="hasText" :modelValue="modelValue.text"
                      @input="onInput($event.target.value, FIELD_TEXT_NAME)"
                      :name="`film-text-${uid}`" label="Text"/>
    </div>
  </div>
</template>