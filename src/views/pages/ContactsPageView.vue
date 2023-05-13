<script setup>
import {useGeneralStore} from '../../stores/general'
import {onBeforeMount, ref} from 'vue'
import {v4 as uuidv4} from 'uuid'
import {languagesOptions} from '../../i18n/languages'
import TabsComponent from "../../components/form/TabsComponent.vue"
import InputComponent from "../../components/form/InputComponent.vue";
import TextareaComponent from "../../components/form/TextareaComponent.vue";
import ImageUpload from "../../components/form/ImageUpload.vue";
import {useValidateForm, Form} from 'vee-validate'
import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../../composables/preparedDataToFirebase'
import {deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore'
import {db, fileExist, uploadFile} from '../../firebase'
import {useRoute, useRouter} from 'vue-router'

const store = useGeneralStore()

const activeLanguage = ref(null)

const loading = ref(false)

const contactsPage = ref({
  id: 'contacts',
  created: '',
  canDelete: false,
  ua: {
    name: 'Контакти',
    cinemas: [
      {
        name: '',
        address: '',
        location: '',
        logo: '',
        active: true,
      }
    ],
    seo: {
      url: '',
      title: '',
      text: '',
      keywords: '',
      description: ''
    }
  },
  ru: {
    name: 'Контакти',
    cinemas: [
      {
        name: '',
        address: '',
        location: '',
        logo: '',
        active: true,
      }
    ],
    seo: {
      url: '',
      title: '',
      text: '',
      keywords: '',
      description: ''
    }
  }
})

function deleteLogo(index) {
  contactsPage.value[activeLanguage.value].cinemas[index].logo = {}
}
function deleteCinema(index) {
  for (let languageKey in contactsPage.value) {
    if (languagesOptions.some(item => item.value === languageKey)) {
      contactsPage.value[languageKey].cinemas.splice(index, 1)
    }
  }
}

function addCinema() {
  for (let languageKey in contactsPage.value) {
    if (languagesOptions.some(item => item.value === languageKey)) {
      contactsPage.value[languageKey].cinemas.push({
        name: '',
        address: '',
        location: '',
        logo: '',
        active: true,
      })
    }
  }
}

function updateCinemaActive(index, value){
  for (let languageKey in contactsPage.value) {
    if (languagesOptions.some(item => item.value === languageKey)) {
      contactsPage.value[languageKey].cinemas[index].active = value
    }
  }
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: contactsPage.value.id,
      canDelete: contactsPage.value.canDelete,
    }

    for (let languageKey in contactsPage.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {

        let items = []

        for (let i = 0; i < contactsPage.value[languageKey].cinemas.length; i++) {
          items.push({
            ...contactsPage.value[languageKey].cinemas[i],
            logo: await prepareImageToFirebase(contactsPage.value[languageKey].cinemas[i].logo, 'pages/contacts')
          })
        }


        setDocData = {
          ...setDocData,
          created: route.params.id ? contactsPage.value.created : serverTimestamp(),
          [languageKey]: {
            ...contactsPage.value[languageKey],
            cinemas: items
          }
        }

      }
    }

    console.log('setDocData', setDocData)


    const docRef = doc(db, "pages", contactsPage.value.id);
    await updateDoc(docRef, setDocData)

    await router.replace({name: 'admin-pages'})
    loading.value = false
  }
}

onBeforeMount(async () => {
  activeLanguage.value = languagesOptions[0].value

  const docRef = doc(db, "pages", contactsPage.value.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    contactsPage.value = docSnap.data()
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
      <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>
    </div>

    <Form @submit="saveChanges">
      <div v-for="(cinema, cinemaIndex) in contactsPage[activeLanguage].cinemas" class="border border-secondary rounded p-4 mb-4" :key="`contacts-cinema-${cinemaIndex}`">
        <div class="row">
          <InputComponent v-model="cinema.name" :name="`contacts-page-cinema-name-${cinemaIndex}`" label="Назва кінотеатра"
                          rules="required" class="col-6 mb-4"/>

          <template v-if="cinemaIndex !== 0" >
            <div class="custom-control custom-switch custom-switch-lg admin__switch col-3">
              <input :checked="cinema.active" @change="updateCinemaActive(cinemaIndex, $event.target.checked)" type="checkbox" class="custom-control-input" :id="`customSwitch-${cinemaIndex}`">
              <label class="custom-control-label" :for="`customSwitch-${cinemaIndex}`"></label>
            </div>

            <div class="col-3 d-flex justify-content-end align-items-start">
              <button @click="deleteCinema(cinemaIndex)" type="button">
                <i class="fa-solid fa-trash-can fa-2xl"></i>
              </button>
            </div>
          </template>
        </div>


        <TextareaComponent v-model="cinema.address" :name="`contacts-page-cinema-address-${cinemaIndex}`"
                           label="Адреса" rules="required" class="mb-4"/>

        <InputComponent v-model="cinema.location" :name="`contacts-page-cinema-location-${cinemaIndex}`" label="Координати для карти"
                        rules="required" class="col-6 mb-4"/>

        <div class="d-flex mb-4">
          <div class="input__label-text">Лого</div>
          <ImageUpload v-model="cinema.logo" @deleteImage="deleteLogo(cinemaIndex)" :name="`contacts-page-cinema-logo-${cinemaIndex}`"
                       :has-text="false" :has-url="false" class="col-2"/>
        </div>
      </div>

      <button @click="addCinema" type="button" class="btn btn-info">Додати кінотеатр</button>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="contactsPage[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="contactsPage[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="contactsPage[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="contactsPage[activeLanguage].seo.description" name="seo-description"
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