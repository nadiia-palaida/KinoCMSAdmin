<script setup>
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import {collection, getDocs, getDoc, doc, updateDoc, setDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";
import {v4 as uuidv4} from "uuid";
import SelectComponent from "../components/form/SelectComponent.vue";
import {useValidateForm, Form} from "vee-validate"
import '@/plugins/vee-validate'
import InputComponent from '../components/form/InputComponent.vue'
import {useRoute, useRouter} from 'vue-router'
import {getDataCollection} from '../composables/queriesFirestore'
import {transformArrToOptions} from '../composables/selectDataOptions'

const activeLanguage = 'ua'

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

const films = ref([])
const halls = ref([])
const cinemas = ref([])
const hall = ref({})
const filmTypesOptions = ref([])
const loading = ref(false)

const hallsOptions = computed(() => {
  return transformArrToOptions(halls.value)
})

const cinemaOptions = computed(() => {
  return transformArrToOptions(cinemas.value)
})
const filmsOptions = computed(() => {
  return transformArrToOptions(films.value)
})

const seans = ref({
  id: uuidv4(),
  film_id: '',
  cinema_id: null,
  hall_id: null,
  seats: [],
  type: null,
  date: null,
  time: null,
  price: null
})

async function getFilmTypes() {
  const selectedFilmItem = await getFilm(seans.value.film_id)
  return seans.value.film_id && selectedFilmItem ? filmTypesOptions.value = selectedFilmItem.type.map(item => {
    return {label: item, value: item}
  }) : []
}

async function getFilm(id) {
  const docRef = doc(db, "films", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

const router = useRouter()
const route = useRoute()

async function saveChanges() {
  const formValidate = useValidateForm()

  if (formValidate) {
    loading.value = true
    const docRef = doc(db, "seanses", seans.value.id);

    const setDocData = {
      ...seans.value
    }

    if (route.params.id) {
      await updateDoc(docRef, setDocData)
    } else {
      await setDoc(docRef, setDocData)
    }

    await router.replace({name: 'admin-seanses', params: {id: hall.value.id}})
    loading.value = false
  }
}

onBeforeMount(async () => {
  films.value = await getDataCollection('films')
  cinemas.value = await getDataCollection('cinemas')

  if (route.params.id) {
    const docRef = doc(db, "seanses", route.params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      seans.value = docSnap.data()
    }
  } else {
    if(cinemas.value.length) {
      seans.value.cinema_id = cinemas.value[0].id
    }
  }
})

watch(() => seans.value.film_id,
    (id) => {
      getFilmTypes()
    }
)

watch(() => seans.value.cinema_id,
    async (id) => {
      halls.value = await getDataCollection('halls', ["cinema_id", "==", seans.value.cinema_id])
    }
)
</script>

<template>
  <Form @submit="saveChanges">
    <SelectComponent v-model="seans.cinema_id" :options="cinemaOptions" label="Кінотеатр" rules="required" name="seans-cinema"
                     class="col-3"/>

    <SelectComponent v-model="seans.hall_id" :options="hallsOptions" label="Зал" rules="required" name="seans-hall"
                     class="col-3"/>

    <SelectComponent v-model="seans.film_id" :options="filmsOptions" label="Фільм" rules="required" name="seans-film"
                     class="col-3"/>

    <SelectComponent v-model="seans.type" v-if="filmTypesOptions.length" :options="filmTypesOptions" rules="required"
                     name="seans-type" label="Тип фільму" class="col-3 mb-4"/>

    <InputComponent v-model="seans.date" name="seans-date" type="date" label="Дата" rules="required"
                    class="col-2 mb-4"/>

    <InputComponent v-model="seans.time" name="seans-time" type="time" label="Час" rules="required" class="col-2 mb-4"/>

    <InputComponent v-model="seans.price" name="seans-price" type="price" label="Ціна" rules="required|numeric"
                    class="col-2 mb-4"/>

    <button type="submit" class="btn btn-success">
      <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span v-else>Зберегти</span>
    </button>
  </Form>
</template>
