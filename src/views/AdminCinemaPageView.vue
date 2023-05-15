<script setup>
import TabsComponent from '../components/form/TabsComponent.vue'
import InputComponent from '../components/form/InputComponent.vue'
import TextareaComponent from '../components/form/TextareaComponent.vue'
import ImageUpload from '../components/form/ImageUpload.vue'
import CinemaHall from '../components/cinemas/CinemaHall.vue'

import moment from 'moment'
import {v4 as uuidv4} from 'uuid'
import {languagesOptions} from '../i18n/languages'
import {useValidateForm, Form} from 'vee-validate'

import {db} from '../firebase'
import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../composables/preparedDataToFirebase'
import {doc, setDoc, updateDoc, deleteDoc} from 'firebase/firestore'

import {onBeforeMount, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useGeneralStore} from '../stores/general'
import {getDataCollection, getItemById} from '../composables/queriesFirestore'

const store = useGeneralStore()
const activeLanguage = ref(null)
const loading = ref(false)

const cinema = ref({
  id: uuidv4(),
  ua: {
    name: '',
    description: '',
    condition: '',
    logo: {},
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
    condition: '',
    logo: {},
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
const halls = ref([])

const SHOW_CINEMA_PAGE = 'cinema-page'
const SHOW_HALL_PAGE = 'hall-page'

const activePage = ref(SHOW_CINEMA_PAGE)

const editedHall = ref(null)

function createdDate(date) {
  if (date) {
    return moment(date.toDate()).format('DD.MM.YYYY');
  }
  return null
}

function addItems(event) {
  if (event.target.files.length) {
    for (let i = 0; i < event.target.files.length; i++) {
      cinema.value[activeLanguage.value].images.push({
        fileId: uuidv4(),
        file: event.target.files[i],
      })
    }
  }
}

function deleteImageGallery(index) {
  cinema.value[activeLanguage.value].images.splice(index, 1)
}

function deleteItem(field) {
  cinema.value[activeLanguage.value][field] = {}
}

function addHall(hall) {
  console.log('hall', hall)
  halls.value.push(hall)
  activePage.value = SHOW_CINEMA_PAGE
}

function editHandleHall(index) {
  editedHall.value = halls.value[index]
  activePage.value = SHOW_HALL_PAGE
}

function editHall(hall) {
  let findHallIndex = halls.value.findIndex(item => item.id === hall.id)
  halls.value[findHallIndex] = hall
  activePage.value = SHOW_CINEMA_PAGE
}

let deletedHalls = []

function deleteHall(index) {
  deletedHalls.push(halls.value[index].id)
  halls.value.splice(index, 1)
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: cinema.value.id
    }

    for (let languageKey in cinema.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {
        const cinemaGallery = await prepareImagesArrToFirebase(cinema.value[languageKey].images, `cinemas/${cinema.value.id}`)
        const cinemaLogo = await prepareImageToFirebase(cinema.value[languageKey].logo, `cinemas/${cinema.value.id}`)
        const cinemaBanner = await prepareImageToFirebase(cinema.value[languageKey].banner, `cinemas/${cinema.value.id}`)

        setDocData = {
          ...setDocData,
          [languageKey]: {
            ...cinema.value[languageKey],
            images: cinemaGallery,
            logo: cinemaLogo,
            banner: cinemaBanner
          }
        }
      }
    }

    const docRef = doc(db, "cinemas", cinema.value.id);
    if (route.params.id) {
      await updateDoc(docRef, setDocData)
    } else {
      await setDoc(docRef, setDocData)
    }

    halls.value.forEach(async item => {
      const docRefHalls = doc(db, "halls", item.id);
      await setDoc(docRefHalls, item)
    })

    if (deletedHalls.length) {
      deletedHalls.forEach(async item => {
        await deleteDoc(doc(db, "halls", item));
      })
      deletedHalls = []
    }

    await router.replace({name: 'admin-cinemas'})
    loading.value = false
  }
}

onBeforeMount(async () => {
  activeLanguage.value = languagesOptions[0].value

  if (route.params.id) {
    cinema.value = await getItemById('cinemas', route.params.id)

    halls.value = await getDataCollection('halls', ["cinema_id", "==", cinema.value.id])
  }

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <div v-if="activePage === SHOW_CINEMA_PAGE">
      <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>

      <Form @submit="saveChanges">
        <InputComponent v-model="cinema[activeLanguage].name" name="cinema-name" label="Назва кінотеатру"
                        rules="required" class="col-3 mb-4"/>

        <TextareaComponent v-model="cinema[activeLanguage].description" name="cinema-description"
                           label="Опис" rules="required" class="mb-4"/>

        <TextareaComponent v-model="cinema[activeLanguage].condition" name="cinema-condition"
                           label="Умова" rules="required" class="mb-4"/>

        <div class="d-flex mb-4">
          <div class="input__label-text">Логотип</div>
          <ImageUpload v-model="cinema[activeLanguage].logo" @deleteImage="deleteItem('logo')" name="cinema-logo"
                       :has-text="false" :has-url="false" class="col-2"/>
        </div>

        <div class="d-flex mb-4">
          <div class="input__label-text">Фото верхнего баннера</div>
          <ImageUpload v-model="cinema[activeLanguage].banner" @deleteImage="deleteItem('banner')" name="cinema-banner"
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

          <div v-if="cinema[activeLanguage].images.length" class="d-flex flex-wrap">
            <ImageUpload v-for="(item, index) in cinema[activeLanguage].images"
                         v-model="cinema[activeLanguage].images[index]" @deleteImage="deleteImageGallery(index)"
                         name="cinema-image" :has-text="false" :has-url="false" class="col-2 mb-2"
                         :key="`cinema-image-${index}`"/>
          </div>
        </div>

        <div>
          <h4 class="text-center mb-4">Список залів</h4>


          <table class="table" v-if="halls.length">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Назва</th>
              <th scope="col">Дата створення</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(hall, hallIndex) in halls">
              <th scope="row">{{ hallIndex + 1 }}</th>
              <td>{{ hall[activeLanguage].name }}</td>
              <td>{{ createdDate(hall.created) }}</td>
              <td>
                <button @click="editHandleHall(hallIndex)" type="button">
                  <i class="fa-solid fa-pen"></i>
                </button>
              </td>
              <td>
                <button @click="deleteHall(hallIndex)" type="button">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>

          <button @click="activePage = SHOW_HALL_PAGE" type="button" class="btn btn-info mb-4">Додати зал</button>
        </div>

        <div class="seo-block">
          <h4 class="text-center mb-4">Seo блок</h4>

          <InputComponent v-model="cinema[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                          class="mb-4"/>

          <InputComponent v-model="cinema[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                          class="mb-4"/>

          <InputComponent v-model="cinema[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                          rules="required"
                          class="mb-4"/>

          <TextareaComponent v-model="cinema[activeLanguage].seo.description" name="seo-description"
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
    </div>

    <CinemaHall v-if="activePage === SHOW_HALL_PAGE" :cinemaId="cinema.id" :hall="editedHall" @createHall="addHall"
                @updateHall="editHall"/>
  </template>
</template>