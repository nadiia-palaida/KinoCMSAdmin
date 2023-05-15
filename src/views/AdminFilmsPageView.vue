<script setup>
import InputComponent from '../components/form/InputComponent.vue'
import TextareaComponent from '../components/form/TextareaComponent.vue'
import ImageUpload from '../components/form/ImageUpload.vue'
import RadioComponent from '../components/form/RadioComponent.vue'
import CheckboxComponent from '../components/form/CheckboxComponent.vue'
import TabsComponent from '../components/form/TabsComponent.vue'

import '@/plugins/vee-validate'
import {languagesOptions} from '../i18n/languages'
import {useValidateForm, Form} from 'vee-validate'
import {v4 as uuidv4} from 'uuid'

import {doc, setDoc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'

import {onBeforeMount, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useGeneralStore} from '../stores/general'
import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../composables/preparedDataToFirebase'
import {getItemById} from '../composables/queriesFirestore'

const store = useGeneralStore()

const loading = ref(false)

const activeLanguage = ref(null)

const filmTypes = [
  {
    label: '3D',
    value: '3D'
  },
  {
    label: '2D',
    value: '2D'
  },
  {
    label: 'IMAX',
    value: 'IMAX'
  },
]

const filmStatus = [
  {
    label: 'В прокаті',
    value: 'isShow'
  },
  {
    label: 'Скоро вийде',
    value: 'showSoon'
  }
]

const film = ref({
  id: uuidv4(),
  type: [],
  status: null,
  ua: {
    name: '',
    description: '',
    poster: {},
    images: [],
    trailer: '',
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
    poster: {},
    images: [],
    trailer: '',
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
      film.value[activeLanguage.value].images.push({
        fileId: uuidv4(),
        file: event.target.files[i],
      })
    }
  }
}

function deleteItem(index) {
  film.value[activeLanguage.value].images.splice(index, 1)
}

function deletePoster() {
  film.value[activeLanguage.value].poster = {}
}

const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: film.value.id,
      type: film.value.type,
      status: film.value.status
    }

    for (let languageKey in film.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {
        const filmGallery = await prepareImagesArrToFirebase(film.value[languageKey].images, `films/${film.value.id}`)
        const filmPoster = await prepareImageToFirebase(film.value[languageKey].poster, `films/${film.value.id}`)

        setDocData = {
          ...setDocData,
          [languageKey]: {
            ...film.value[languageKey],
            poster: filmPoster,
            images: filmGallery,
          }
        }
      }
    }

    const docRef = doc(db, "films", film.value.id);

    if (route.params.id) {
      await updateDoc(docRef, setDocData)
    } else {
      await setDoc(docRef, setDocData)
    }

    loading.value = false
  }
}

onBeforeMount(async () => {
  activeLanguage.value = languagesOptions[0].value

  if (route.params.id) {
    film.value = await getItemById('films', route.params.id)
  } else {
    film.value.status = filmStatus[0].value
  }
  store.setLoading(false)
})

</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>

    <Form @submit="saveChanges">
      <InputComponent v-model="film[activeLanguage].name" name="film-name" label="Назва фільму" rules="required"
                      class="col-3 mb-4"/>

      <TextareaComponent v-model="film[activeLanguage].description" name="film-description" label="Опис"
                         rules="required" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="input__label-text">Головна картинка</div>
        <ImageUpload v-model="film[activeLanguage].poster" @deleteImage="deletePoster" name="film-poster"
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
                 accept="image/png, image/jpeg, image/jpg, image/webp, image/svg"
                 class="image-upload__input">
        </label>

        <div v-if="film[activeLanguage].images.length" class="d-flex flex-wrap">
          <ImageUpload v-for="(item, index) in film[activeLanguage].images" v-model="film[activeLanguage].images[index]"
                       @deleteImage="deleteItem(index)" name="film-image" :has-text="false" :has-url="false"
                       class="col-2 mb-2" :key="`film-image-${index}`"/>
        </div>
      </div>

      <InputComponent v-model="film[activeLanguage].trailer" name="film-trailer" label="Посилання на трейлер"
                      rules="required" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="mr-4">Тип фільму</div>
        <div class="d-flex">
          <CheckboxComponent v-model="film.type" :options="filmTypes" name="film-type"
                             rules="required"/>
        </div>
      </div>

      <div class="d-flex mb-4">
        <div class="mr-4">Показ фільму</div>
        <div class="d-flex">
          <RadioComponent v-model="film.status" :options="filmStatus" name="film-type"
                          rules="required"/>
        </div>
      </div>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="film[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="film[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="film[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="film[activeLanguage].seo.description" name="seo-description" label="Description"
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
