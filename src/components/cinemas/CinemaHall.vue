<script setup>
import TabsComponent from '../../components/form/TabsComponent.vue'
import InputComponent from '../../components/form/InputComponent.vue'
import TextareaComponent from '../../components/form/TextareaComponent.vue'
import ImageUpload from '../../components/form/ImageUpload.vue'

import {v4 as uuidv4} from 'uuid'
import {useGeneralStore} from '../../stores/general'
import {languagesOptions} from '../../i18n/languages'
import {useValidateForm, Form} from 'vee-validate'
import {useRoute, useRouter} from 'vue-router'

import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../../composables/preparedDataToFirebase'
import {serverTimestamp} from 'firebase/firestore'

import {onBeforeMount, onMounted, ref} from 'vue'

const props = defineProps({
  cinemaId: {type: String},
  hall: {type: Object},
})

const emit = defineEmits(['updateHall', 'createHall'])

const store = useGeneralStore()
const activeLanguage = ref(null)
const loading = ref(false)

const cinemaHall = ref({
  id: uuidv4(),
  cinema_id: null,
  created: null,
  seats: [],
  ua: {
    name: '',
    description: '',
    schema: {},
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
    schema: {},
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
      cinemaHall.value[activeLanguage.value].images.push({
        fileId: uuidv4(),
        file: event.target.files[i],
      })
    }
  }
}

function deleteBanner() {
  cinemaHall.value[activeLanguage.value].banner = {}
}

function deleteSchema() {
  cinemaHall.value[activeLanguage.value].schema = {}
}

function deleteImageGallery(index) {
  cinemaHall.value[activeLanguage.value].images.splice(index, 1)
}

function addRow() {
  cinemaHall.value.seats.push(0)
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: cinemaHall.value.id,
      cinema_id: cinemaHall.value.cinema_id,
      seats: cinemaHall.value.seats
    }

    for (let languageKey in cinemaHall.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {

        const cinemaHallGallery = await prepareImagesArrToFirebase(cinemaHall.value[languageKey].images, `halls/${cinemaHall.value.id}`)
        const cinemaHallBanner = await prepareImageToFirebase(cinemaHall.value[languageKey].banner, `halls/${cinemaHall.value.id}`)
        const cinemaHallSchema = await prepareImageToFirebase(cinemaHall.value[languageKey].schema, `halls/${cinemaHall.value.id}`)

        setDocData = {
          ...setDocData,
          created: route.params.id ? cinemaHall.value.created : serverTimestamp(),
          [languageKey]: {
            ...cinemaHall.value[languageKey],
            images: cinemaHallGallery,
            banner: cinemaHallBanner,
            schema: cinemaHallSchema
          }
        }
      }
    }

    if(!props.hall) {
      emit('createHall', setDocData)
    } else {
      emit('updateHall', setDocData)
    }

    await router.replace({name: 'admin-cinemas-page', params: {id: cinemaHall.value.cinema_id}})

    loading.value = false
  }
}

onBeforeMount(async () => {
  activeLanguage.value = languagesOptions[0].value

  if(props.hall) {
    cinemaHall.value = props.hall
  }
})

onMounted(() => {
  cinemaHall.value.cinema_id = props.cinemaId

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>

    <Form @submit="saveChanges">
      <InputComponent v-model="cinemaHall[activeLanguage].name" name="cinema-hall-name" label="Назва залу"
                      rules="required" class="col-3 mb-4"/>

      <TextareaComponent v-model="cinemaHall[activeLanguage].description" name="cinema-hall-description"
                         label="Опис залу" rules="required" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="input__label-text">Схема залу</div>
        <ImageUpload v-model="cinemaHall[activeLanguage].schema" @deleteImage="deleteSchema" name="cinema-hall-schema"
                     :has-text="false" :has-url="false" class="col-2"/>
      </div>

      <div class="mb-4">
        <div class="d-flex align-items-center mb-2">
          <div class="input__label-text mr-2">Місця</div>

          <button @click.prevent.stop="addRow" type="button" class="btn btn-info">Додати ряд</button>
        </div>

        <template v-for="(row, rowIndex) in cinemaHall.seats">
          <InputComponent v-model="cinemaHall.seats[rowIndex]" :name="`cinema-hall-seats-${rowIndex}`"
                          label="Кількість місць в ряді" rules="required|integer" class="mb-4"/>
        </template>
      </div>

      <div class="d-flex mb-4">
        <div class="input__label-text">Верхній банер</div>
        <ImageUpload v-model="cinemaHall[activeLanguage].banner" @deleteImage="deleteBanner" name="cinema-hall-banner"
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

        <div v-if="cinemaHall[activeLanguage].images.length" class="d-flex flex-wrap">
          <ImageUpload v-for="(item, index) in cinemaHall[activeLanguage].images"
                       v-model="cinemaHall[activeLanguage].images[index]" @deleteImage="deleteItem(index)"
                       name="cinema-hall-image" :has-text="false" :has-url="false" class="col-2 mb-2"
                       :key="`cinema-hall-image-${index}`"/>
        </div>
      </div>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="cinemaHall[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="cinemaHall[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="cinemaHall[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="cinemaHall[activeLanguage].seo.description" name="seo-description"
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