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

const props = defineProps({
  hallId: {required: true},
})

const films = ref([])
const hall = ref({})
const filmTypesOptions = ref([])
const loading = ref(false)

const filmsOptions = computed(() => {
  return films.value.map(item => {
    return {
      label: item[activeLanguage].name,
      value: item.id
    }
  })
})

const seans = ref({
  id: uuidv4(),
  film_id: null,
  cinema_id: props.cinemaId,
  hall_id: props.hallId,
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

async function getFilms() {
  const querySnapshot = await getDocs(collection(db, "films"));

  querySnapshot.forEach((doc) => {
    films.value.push(doc.data())
  });
}

async function getHall(id) {
  const docRef = doc(db, "halls", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    hall.value = docSnap.data()
  }
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

    await router.replace({name: 'admin-cinemas-hall', params: {id: hall.value.id}})
    loading.value = false
  }
}

onBeforeMount(async () => {
  await getFilms()

  await getHall(props.hallId)

  if (hall.value) {
    seans.value.cinema_id = hall.value.cinema_id
    seans.value.seats = JSON.parse(JSON.stringify(hall.value.seats))
  }

  if (route.params.id) {
    const docRef = doc(db, "seanses", route.params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      seans.value = docSnap.data()
    }
  }
})

watch(() => seans.value.film_id,
    (id) => {
      getFilmTypes()
    }
)
</script>

<template>
  <Form @submit="saveChanges">
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
