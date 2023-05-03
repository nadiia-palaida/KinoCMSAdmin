<script setup>
import AdminLayout from "../layouts/AdminLayout.vue"
import {computed, onMounted, ref} from 'vue'
import {useGeneralStore} from "../stores/general";
import TabsComponent from "../components/form/TabsComponent.vue"
import {languagesOptions} from '../i18n/languages'
import {Form} from "vee-validate"
import InputComponent from "../components/form/InputComponent.vue";
import TextareaComponent from "../components/form/TextareaComponent.vue";
import ImageUpload from "../components/form/ImageUpload.vue";
import {v4 as uuidv4} from "uuid";
import CheckboxComponent from "../components/form/CheckboxComponent.vue";
import {doc, setDoc} from "firebase/firestore";
import {db, fileExist, uploadFile} from "../firebase";

const store = useGeneralStore()

const loading = ref(false)

const UKRAINIAN_LANGUAGE_NAME = 'ua'
const RUSSIAN_LANGUAGE_NAME = 'ru'
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

const filmId = computed(() => {
  return uuidv4()
})

const film = ref({
  ua: {
    id: filmId,
    name: '',
    description: '',
    poster: {},
    images: [],
    trailer: '',
    type: [],
    seo: {
      url: '',
      title: '',
      keywords: '',
      description: ''
    }
  },
  ru: {
    id: filmId,
    name: '',
    description: '',
    poster: {},
    images: [],
    trailer: '',
    type: [],
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
  console.log('delete')
  film.value[activeLanguage.value].poster = {}
}

async function saveChanges() {
  let items = []

  const filmLanguageValue = film.value[activeLanguage.value]

  for (let i = 0; i < filmLanguageValue.images.length; i++) {
    let item = filmLanguageValue.images[i]

    items.push({
      fileId: item.fileId,
      file: await fileExist(item.fileId, `films/${filmLanguageValue.id}`) ? item.file : await uploadFile(`films/${filmLanguageValue.id}/${item.fileId}`, item.file),
    })
  }

  let filmPoster = filmLanguageValue.poster

  if(Object.keys(filmLanguageValue.poster).length)  {
    filmPoster = {
      fileId: filmLanguageValue.poster.fileId,
      file: await fileExist(filmLanguageValue.poster.fileId, `films/${filmLanguageValue.id}`) ? filmLanguageValue.poster.file : await uploadFile(`films/${filmLanguageValue.id}/${filmLanguageValue.poster.fileId}`, filmLanguageValue.poster.file),
    }
  }

  const setDocData = {
    id: filmLanguageValue.id,
    name: filmLanguageValue.name,
    description: filmLanguageValue.description,
    poster: filmPoster,
    images: items,
    trailer: filmLanguageValue.trailer,
    type: filmLanguageValue.type,
    seo: {
      url: filmLanguageValue.seo.url,
      title: filmLanguageValue.seo.title,
      keywords: filmLanguageValue.seo.keywords,
      description: filmLanguageValue.seo.description
    }
  }

  await setDoc(doc(db, "films", "filmsList"), setDocData)

  console.log('success')
}

onMounted(() => {
  store.setLoading(false)
  activeLanguage.value = languagesOptions[0].value
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>

    <Form @submit="saveChanges">
      <InputComponent v-model="film[activeLanguage].name" name="film-name" label="Назва фільму" class="col-3 mb-4"/>

      <TextareaComponent v-model="film[activeLanguage].description" name="film-description" label="Опис" class="mb-4"/>

      <div class="d-flex mb-4">
        <div class="input__label-text">Головна картинка</div>
        <ImageUpload v-model="film[activeLanguage].poster" @deleteImage="deletePoster" name="film-poster"
                     :has-text="false" :has-url="false"
                     class="col-2"/>
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
                       @deleteImage="deleteItem(index)"
                       name="film-image" :has-text="false" :has-url="false" class="col-2 mb-2"
                       :key="`film-image-${index}`"/>
        </div>
      </div>

      <InputComponent v-model="film[activeLanguage].trailer" name="film-trailer" label="Посилання на трейлер"
                      class="mb-4"/>


      <div class="d-flex mb-4">
        <div class="mr-4">Тип фільму</div>
        <div class="d-flex">
          <CheckboxComponent v-model="film[activeLanguage].type" :options="filmTypes"/>
        </div>
      </div>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="film[activeLanguage].url" name="seo-url" label="URL" class="mb-4"/>

        <InputComponent v-model="film[activeLanguage].title" name="seo-title" label="Title" class="mb-4"/>

        <InputComponent v-model="film[activeLanguage].keywords" name="seo-keywords" label="Keywords" class="mb-4"/>

        <TextareaComponent v-model="film[activeLanguage].description" name="seo-description" label="Description"
                           class="mb-4"/>
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
