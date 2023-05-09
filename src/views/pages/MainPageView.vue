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
import {db} from '../../firebase'
import {useRoute, useRouter} from 'vue-router'

const store = useGeneralStore()

const activeLanguage = ref(null)

const loading = ref(false)

const mainPage = ref({
  id: 'main',
  firstPhone: '',
  secondPhone: '',
  created: '',
  canDelete: false,
  active: true,
  ua: {
    name: 'Головна сторінка',
    seo: {
      url: '',
      title: '',
      text: '',
      keywords: '',
      description: ''
    }
  },
  ru: {
    name: 'Главная страница',
    seo: {
      url: '',
      title: '',
      text: '',
      keywords: '',
      description: ''
    }
  }
})

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    let setDocData = {
      id: mainPage.value.id,
      firstPhone: mainPage.value.firstPhone,
      secondPhone: mainPage.value.secondPhone,
      canDelete: mainPage.value.canDelete,
      active: mainPage.value.active
    }

    for (let languageKey in mainPage.value) {
      if (languagesOptions.some(item => item.value === languageKey)) {

        setDocData = {
          ...setDocData,
          created: route.params.id ? mainPage.value.created : serverTimestamp(),
          [languageKey]: {
            ...mainPage.value[languageKey],
          }
        }
      }
    }

    const docRef = doc(db, "pages", mainPage.value.id);
    await updateDoc(docRef, setDocData)

    await router.replace({name: 'admin-pages'})
    loading.value = false
  }
}

onBeforeMount(async() => {
  activeLanguage.value = languagesOptions[0].value

    const docRef = doc(db, "pages",  mainPage.value.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      mainPage.value = docSnap.data()
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
        <input v-model="mainPage.active" type="checkbox" class="custom-control-input" id="customSwitch1">
        <label class="custom-control-label" for="customSwitch1"></label>
      </div>

      <TabsComponent v-model="activeLanguage" :options="languagesOptions" class="mb-4"/>
    </div>

    <Form @submit="saveChanges">
      <div>
        <div class="mb-2">Телефони</div>

        <InputComponent v-model="mainPage[activeLanguage].firstPhone" name="main-page-first-phone"
                        rules="required|digits:10" class="col-6 mb-4"/>

        <InputComponent v-model="mainPage.secondPhone" name="main-page-second-phone"
                        rules="required|digits:10" class="col-6 mb-4"/>
      </div>

      <TextareaComponent v-model="mainPage[activeLanguage].seo.text" name="main-page-description"
                         label="Опис" rules="required" class="mb-4"/>

      <div class="seo-block">
        <h4 class="text-center mb-4">Seo блок</h4>

        <InputComponent v-model="mainPage[activeLanguage].seo.url" name="seo-url" label="URL" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="mainPage[activeLanguage].seo.title" name="seo-title" label="Title" rules="required"
                        class="mb-4"/>

        <InputComponent v-model="mainPage[activeLanguage].seo.keywords" name="seo-keywords" label="Keywords"
                        rules="required"
                        class="mb-4"/>

        <TextareaComponent v-model="mainPage[activeLanguage].seo.description" name="seo-description"
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