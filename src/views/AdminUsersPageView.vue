<script setup>
import TabsComponent from '../components/form/TabsComponent.vue'
import InputComponent from '../components/form/InputComponent.vue'
import RadioComponent from '../components/form/RadioComponent.vue'
import TextareaComponent from '../components/form/TextareaComponent.vue'
import ImageUpload from '../components/form/ImageUpload.vue'
import VueMultiselect from 'vue-multiselect'

import {citiesOptionsList} from '../composables/cities'

import {languagesOptions} from '../i18n/languages'
import {useValidateForm, Form} from 'vee-validate'

import {db} from '../firebase'
import {getItemById} from '../composables/queriesFirestore'
import {doc, updateDoc} from 'firebase/firestore'

import {onBeforeMount, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useGeneralStore} from '../stores/general'

const store = useGeneralStore()

const loading = ref(false)

const activeLanguage = ref(null)

const user = ref({
  id: null,
  firstName: '',
  lastName: '',
  nick: '',
  email: '',
  address: '',
  password: '',
  checkPassword: '',
  cardNumber: '',
  lang: '',
  gender: '',
  phone: '',
  birthDate: '',
  city: '',
})

const genderOptionsList = [
  {
    label: 'Чоловіча',
    value: 'male'
  },
  {
    label: 'Жіноча',
    value: 'female'
  },
]

const languagesOptionsList = [
  {
    label: 'Українська',
    value: 'ua'
  },
  {
    label: 'Російська',
    value: 'ru'
  },
]


async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true

    const setDocData = {...user.value}

    const docRef = doc(db, "users", user.value.id);
    await updateDoc(docRef, setDocData)

    await router.replace({name: 'admin-users'})
    loading.value = false
  }
}

const router = useRouter()
const route = useRoute()

onBeforeMount(async () => {
  activeLanguage.value = languagesOptions[0].value

  if (route.params.id) {
    user.value = await getItemById('users', route.params.id)
  }

  store.isLoading = false
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <Form @submit="saveChanges">
      <div class="row">
        <div class="col-6">
          <InputComponent v-model="user.firstName" name="user-first-name" label="Ім'я"
                          rules="required" class="mb-4"/>
          <InputComponent v-model="user.lastName" name="user-last-name" label="Прізвище"
                          rules="required" class="mb-4"/>
          <InputComponent v-model="user.nick" name="user-nick" label="Псевдонім"
                          rules="required" class="mb-4"/>
          <InputComponent v-model="user.email" name="user-email" label="E-mail"
                          rules="required|email" class="mb-4"/>
          <InputComponent v-model="user.address" name="user-address" label="Адреса"
                          rules="required" class="mb-4"/>
          <InputComponent v-model="user.cardNumber" name="user-card-number" label="Номер карти"
                          rules="required|digits:16" class="mb-4"/>
        </div>

        <div class="col-6">
          <RadioComponent v-model="user.lang" :options="languagesOptionsList" name="user-lang" label="Мова"
                          class="mb-3"/>
          <RadioComponent v-model="user.gender" :options="genderOptionsList" name="user-gender" label="Стать"
                          class="mb-3"/>
          <InputComponent v-model="user.phone" name="user-phone" label="Телефон"
                          rules="required|digits:10" class="mb-4"/>
          <InputComponent v-model="user.birthDate" name="user-birthday" label="Дата народження" type="date"
                          rules="required" class="mb-4"/>

          <div class="d-flex align-items-center mb-4">
            <div class="multi-select-label">Місто</div>
            <VueMultiselect v-model="user.city" :options="citiesOptionsList" label="label" :preserve-search="true"
                            track-by="value"/>
          </div>

          <InputComponent v-model="user.password" name="user-password" label="Пароль" type="password"
                          rules="required" class="mb-4"/>
          <InputComponent v-model="user.checkPassword" name="user-check-password" label="Повторити пароль"
                          type="password"
                          rules="required" class="mb-4"/>
        </div>
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
