<script setup>
import TabsComponent from '../../components/form/TabsComponent.vue'
import InputComponent from '../../components/form/InputComponent.vue'
import TextareaComponent from '../../components/form/TextareaComponent.vue'
import ImageUpload from '../../components/form/ImageUpload.vue'


import {v4 as uuidv4} from 'uuid'
import {languagesOptions} from '../../i18n/languages'
import {useValidateForm, Form} from 'vee-validate'

import {db} from '../../firebase'
import {doc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore'
import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../../composables/preparedDataToFirebase'

import {onBeforeMount, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useGeneralStore} from '../../stores/general'
import {getItemById} from '../../composables/queriesFirestore'

const store = useGeneralStore()

const activeLanguage = ref(null)

const loading = ref(false)

const item = ref({
  id: uuidv4(),
  created: null,
  active: true,
  canDelete: true,
  ua: {
    name: '',
    description: '',
    banner: {},
    images: [],
    seo: {
      url: '',
      title: '',
      keywords: '',
      description: ''
    }
  },
  ru: {
    name: '',
    description: '',
    banner: {},
    images: [],
    seo: {
      url: '',
      title: '',
      keywords: '',
      description: ''
    }
  }
})

function addItems(event) {
  if (event.target.files.length) {
    for (let i = 0; i < event.target.files.length; i++) {
      item.value[activeLanguage.value].images.push({
        fileId: uuidv4(),
        file: event.target.files[i],
      })
    }
  }
}

function deleteBanner() {
  item.value[activeLanguage.value].banner = {}
}

function deleteImageGallery(index) {
  item.value[activeLanguage.value].images.splice(index, 1)
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: item.value.id,
      active: item.value.active,
      canDelete: item.value.canDelete,
    }

    for (let languageKey in item.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {

        const itemGallery = await prepareImagesArrToFirebase(item.value[languageKey].images, `pages/${item.value.id}`)
        const itemBanner = await prepareImageToFirebase(item.value[languageKey].banner, `pages/${item.value.id}`)

        setDocData = {
          ...setDocData,
          created: route.params.id ? item.value.created : serverTimestamp(),
          [languageKey]: {
            ...item.value[languageKey],
            images: itemGallery,
            banner: itemBanner
          }
        }
      }
    }

    const docRef = doc(db, "pages", item.value.id);
    if (route.params.id) {
      await updateDoc(docRef, setDocData)
    } else {
      await setDoc(docRef, setDocData)
    }

    await router.replace({name: 'admin-pages'})
    loading.value = false
  }
}

onBeforeMount(async() => {
  activeLanguage.value = languagesOptions[0].value

  if (route.params.id) {
    item.value = await getItemById("pages", route.params.id)
  }

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div class="d-flex">
      <div class="custom-control custom-switch custom-switch-lg admin__switch mr-4">
        <input v-model="item.active" type="checkbox" class="custom-control-input" id="customSwitch1">
        <label class="custom-control-label" for="customSwitch1"></label>
      </div>

      <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>
    </div>

    <Form @submit="saveChanges">
        <InputComponent v-model="item[activeLanguage].name" name="item-name" label="Назва"
                        rules="required" class="col-6 mb-4"/>

      <TextareaComponent v-model="item[activeLanguage].description" name="item-description"
                         label="Опис" rules="required" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="input__label-text">Головна картинка</div>
        <ImageUpload v-model="item[activeLanguage].banner" @deleteImage="deleteBanner" name="item-banner"
                     :has-text="false" :has-url="false" class="col-2"/>
      </div>

      <div class="mb-4">
        <div class="mb-2">
          <div class="input__label-text">Галерея картинок</div>
          <div class="input__label-text">Размер: 1000х190</div>
        </div>

        <label type="button" class="btn btn-info mb-4">
          Додати фото

          <input @change="addItems" type="file" multiple
                 accept="image/png, image/jpeg, image/jpg, image/webp, image/svg" class="image-upload__input">
        </label>

        <div v-if="item[activeLanguage].images.length" class="d-flex flex-wrap">
          <ImageUpload v-for="(imageItem, index) in imageItem[activeLanguage].images"
                       v-model="imageItem[activeLanguage].images[index]" @deleteImage="deleteImageGallery(index)"
                       name="item-image" :has-text="false" :has-url="false" class="col-2 mb-2"
                       :key="`item-image-${index}`"/>
        </div>
      </div>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="item[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="item[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="item[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="item[activeLanguage].seo.description" name="seo-description"
                           label="Description"
                           rules="required" class="mb-4"/>
      </div>

      <button type="submit" class="btn btn-success">
        <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <span v-else>Зберегти</span>
      </button>
    </Form>
  </template>
</template>