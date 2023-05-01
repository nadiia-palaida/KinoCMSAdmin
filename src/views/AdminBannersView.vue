<script setup>
import AdminLayout from "../layouts/AdminLayout.vue"
import TopBanners from "../components/banners/TopBanners.vue"
import { doc, getDocs, collection } from "firebase/firestore"
import {db} from "../firebase"
import {computed, ref, onMounted} from 'vue'

const startedValue = ref({})

const isLoading = ref(true)

const NAME_TOP_BANNERS = 'topBanners'

onMounted(async () => {
  isLoading.value = true
  startedValue.value = await getDocs(collection(db, "banners"));
  startedValue.value.forEach((doc) => {
    startedValue.value[doc.id] =  doc.data()
  });
  isLoading.value = false
})
</script>

<template>
  <AdminLayout>
    <TopBanners v-if="!isLoading" :banners-info="startedValue[NAME_TOP_BANNERS]"/>


  </AdminLayout>
</template>