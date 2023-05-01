<script setup>
import {useIsFormValid, useValidateForm, Form} from "vee-validate"
import InputComponent from "../form/AdminInputComponent.vue"
import ImageUpload from "../form/ImageUpload.vue"
import {doc, setDoc} from "firebase/firestore";
import {db, uploadFile} from "../../firebase";
import {v4 as uuidv4} from 'uuid';
import {ref, onMounted} from 'vue'

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

const topBanners = ref({
  active: true,
  items: [],
  speed: 0
})

function uploadImage(banner, index) {
  if (topBanners.value.items[index]) {
    topBanners.value.items[index] = banner
  } else {
    topBanners.value.items.push(banner)
  }
}

function addItem() {
  topBanners.value.items.push({
    id: uuidv4(),
    fileId: uuidv4(),
    file: '',
    url: '',
    text: ''
  })
}

function deleteItem(index) {
  topBanners.value.items.splice(index, 1)
}

async function saveChanges() {
  let items = []

  for (let i = 0; i < topBanners.value.items.length; i++) {
    let item = topBanners.value.items[i]
    items.push({
      id: item.id,
      fileId: item.fileId,
      file: await uploadFile(`top-banners/${item.fileId}`, item.file),
      url: item.url,
      text: item.text
    })
  }

  const setDocData = {
    active: topBanners.value.active,
    items: items,
    speed: topBanners.value.speed
  }

  setDoc(doc(db, "banners", "topBanners"), setDocData)
}
</script>

<template>
  <section class="admin__section">
    <h2 class="text-center mb-4">На головній верх</h2>

    <div class="admin__block shadow-lg rounded p-3">
      <div class="admin__switch-wrap">
        {{ topBanners.active }}
        <div class="custom-control custom-switch custom-switch-lg admin__switch ml-auto">
          <input v-model="topBanners.active" type="checkbox" class="custom-control-input" id="customSwitch1">
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>

      <div class="mb-4">Размер: 1000х190</div>

      <Form>
        <button type="button" @click="addItem" class="btn btn-info mb-4">Додати фото</button>

        <div class="admin__form-images mb-2">
          <template v-if="topBanners.items">
            <ImageUpload v-for="(item, index) in topBanners.items" :modelValue="item"
                         @update:modelValue="uploadImage($event, index)" @deleteImage="deleteItem(index)"
                         class="mr-4 mb-4" :key="`top-banner-image-${index}`"/>
          </template>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Швидкість каруселі</label>
          </div>
          <select v-model="topBanners.speed" class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option v-for="option in speedOptions" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
      </Form>

      <button @click="saveChanges" class="btn btn-success">Зберегти</button>
    </div>
  </section>
</template>
