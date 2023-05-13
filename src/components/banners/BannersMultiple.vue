<script setup>
import InputComponent from '../form/InputComponent.vue'
import ImageUpload from '../form/ImageUpload.vue'
import SelectComponent from '../form/SelectComponent.vue'

import {useIsFormValid, useValidateForm, Form} from 'vee-validate'
import {fileExist, uploadFile} from '../../firebase'
import {v4 as uuidv4} from 'uuid'

import {ref, onMounted, computed} from 'vue'

const props = defineProps({
  name: {type: String},
  bannersInfo: {type: Object, required: true},
  loading: {type: Boolean, default: false},
  title: {type: String},
  firebasePathName: {type: String, required: true},
  hasText: {type: Boolean, default: true}
})

const emit = defineEmits(['saveChanges'])

const speedOptions = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '30',
    value: 30
  },
]

const banners = ref({
  active: true,
  items: [],
  speed: 0
})

const bannersItems = computed(() => {
  return banners.value.items
})

function uploadImage(banner, index) {
  banners.value.items[index] ? banners.value.items[index] = banner : banners.value.items.push(banner)
}

function addItems(event) {
  if (event.target.files.length) {
    for (let i = 0; i < event.target.files.length; i++) {
      banners.value.items.push({
        id: uuidv4(),
        fileId: uuidv4(),
        file: event.target.files[i],
        url: '',
        text: ''
      })
    }
  }
}

function deleteItem(index) {
  banners.value.items.splice(index, 1)
}

async function saveChanges() {
  let items = []

  for (let i = 0; i < banners.value.items.length; i++) {
    let item = banners.value.items[i]

    items.push({
      id: item.id,
      fileId: item.fileId,
      file: await fileExist(item.fileId, props.firebasePathName) ? item.file : await uploadFile(`${props.firebasePathName}/${item.fileId}`, item.file),
      url: item.url,
      text: item.text
    })
  }

  banners.value.items = items

  const setDocData = {
    active: banners.value.active,
    items: items,
    speed: banners.value.speed
  }

  emit('saveChanges', setDocData)
}

onMounted(() => {
  banners.value = props.bannersInfo

  if (!banners.value.speed) {
    banners.value.speed = speedOptions[0].value
  }
})
</script>

<template>
  <section class="admin__section">
    <h2 v-if="title" class="text-center mb-4">{{ title }}</h2>

    <div class="admin__block shadow-lg rounded p-3">
      <div class="admin__switch-wrap">
        <div class="custom-control custom-switch custom-switch-lg admin__switch ml-auto">
          <input v-model="banners.active" type="checkbox" class="custom-control-input" id="customSwitch1">
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>

      <div class="mb-4">Размер: 1000х190</div>

      <Form @submit="saveChanges">
        <label type="button" class="btn btn-info mb-4">
          Додати фото

          <input @change="addItems" type="file" multiple
                 accept="image/png, image/jpeg, image/jpg, image/webp, image/svg"
                 class="image-upload__input">
        </label>

        <div class="admin__form-images mb-2">
          <template v-if="bannersItems">
            <ImageUpload v-for="(item, index) in bannersItems" :modelValue="item" :hasText="hasText" :name="`${name}-banner-${index}`"
                         @update:modelValue="uploadImage($event, index)" @deleteImage="deleteItem(index)"
                         class="mr-4 mb-4" :key="`top-banner-image-${item.id}`" rules="required"/>
          </template>
        </div>

        <SelectComponent v-model="banners.speed" :options="speedOptions" label="Швидкість каруселі"
                         name="top-banners-carousel-speed" class="col-3"/>

        <button type="submit" class="btn btn-success">
          <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <span v-else>Зберегти</span>
        </button>
      </Form>
    </div>
  </section>
</template>
