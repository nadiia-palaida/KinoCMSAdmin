<script setup>
import {useGeneralStore} from '../stores/general'
import {onBeforeMount, ref} from 'vue'
import {v4 as uuidv4} from 'uuid'
import {languagesOptions} from '../i18n/languages'
import TabsComponent from "../components/form/TabsComponent.vue"
import InputComponent from "../components/form/InputComponent.vue";
import TextareaComponent from "../components/form/TextareaComponent.vue";
import ImageUpload from "../components/form/ImageUpload.vue";
import {useValidateForm, Form} from 'vee-validate'
import {prepareImagesArrToFirebase, prepareImageToFirebase} from '../composables/preparedDataToFirebase'
import {deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'
import {useRoute, useRouter} from 'vue-router'

const store = useGeneralStore()

const activeLanguage = ref(null)

const loading = ref(false)

const news = ref({
  id: uuidv4(),
  created: null,
  active: true,
  publication_date: null,
  ua: {
    name: '',
    description: '',
    banner: {},
    images: [],
    video_link: '',
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
    video_link: '',
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
      news.value[activeLanguage.value].images.push({
        fileId: uuidv4(),
        file: event.target.files[i],
      })
    }
  }
}

function deleteBanner() {
  news.value[activeLanguage.value].banner = {}
}

function deleteImageGallery(index) {
  news.value[activeLanguage.value].images.splice(index, 1)
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: news.value.id,
      active: news.value.active,
      publication_date: news.value.publication_date
    }

    for (let languageKey in news.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {

        const cinemaGallery = await prepareImagesArrToFirebase(news.value[languageKey].images, `news/${news.value.id}`)
        const cinemaBanner = await prepareImageToFirebase(news.value[languageKey].banner, `news/${news.value.id}`)

        setDocData = {
          ...setDocData,
          created: route.params.id ? news.value.created : serverTimestamp(),
          [languageKey]: {
            ...news.value[languageKey],
            images: cinemaGallery,
            banner: cinemaBanner
          }
        }
      }
    }

    const docRef = doc(db, "news", news.value.id);
    if (route.params.id) {
      await updateDoc(docRef, setDocData)
    } else {
      await setDoc(docRef, setDocData)
    }

    await router.replace({name: 'admin-news'})
    loading.value = false
  }
}

onBeforeMount(async() => {
  activeLanguage.value = languagesOptions[0].value

  if (route.params.id) {
    const docRef = doc(db, "news", route.params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      news.value = docSnap.data()
    }
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
        <input v-model="news.active" type="checkbox" class="custom-control-input" id="customSwitch1">
        <label class="custom-control-label" for="customSwitch1"></label>
      </div>

      <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>
    </div>

    <Form @submit="saveChanges">
      <div class="row">
        <InputComponent v-model="news[activeLanguage].name" name="news-name" label="Назва новини"
                        rules="required" class="col-6 mb-4"/>

        <InputComponent v-model="news.publication_date" name="news-publication-date" type="date" label="Дата публікації"
                        rules="required" class="col-6 mb-4"/>
      </div>

      <TextareaComponent v-model="news[activeLanguage].description" name="news-description"
                         label="Опис" rules="required" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="input__label-text">Головна картинка</div>
        <ImageUpload v-model="news[activeLanguage].banner" @deleteImage="deleteBanner" name="news-banner"
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

        <div v-if="news[activeLanguage].images.length" class="d-flex flex-wrap">
          <ImageUpload v-for="(item, index) in news[activeLanguage].images"
                       v-model="news[activeLanguage].images[index]" @deleteImage="deleteImageGallery(index)"
                       name="news-image" :has-text="false" :has-url="false" class="col-2 mb-2"
                       :key="`news-image-${index}`"/>
        </div>
      </div>

      <InputComponent v-model="news[activeLanguage].video_link" name="news-video" label="Посилання на відео"
                      rules="required|url" class="col-6 mb-4"/>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="news[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="news[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="news[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="news[activeLanguage].seo.description" name="seo-description"
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