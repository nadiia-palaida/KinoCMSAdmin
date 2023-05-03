<script setup>
import AdminLayout from "../layouts/AdminLayout.vue"
import BannersMultiple from "../components/banners/BannersMultiple.vue"
import BannerBackground from "../components/banners/BannerBackground.vue";
import {doc, getDocs, collection, setDoc} from "firebase/firestore"
import {db, fileExist, uploadFile} from "../firebase"
import {computed, ref, onMounted} from 'vue'
import {useGeneralStore} from "../stores/general";

const startedValue = ref({})

const store = useGeneralStore()

const isLoading = ref(true)
const isLoadingTopBanners = ref(false)
const isLoadingNews = ref(false)
const isLoadingBackground = ref(false)

const NAME_TOP_BANNERS = 'topBanners'
const NAME_NEWS_BANNERS = 'newsBanners'
const NAME_BACKGROUND_BANNERS = 'backgroundBanner'

async function saveChanges(data, firebasePathSegment) {
  if (firebasePathSegment === NAME_TOP_BANNERS) {
    isLoadingTopBanners.value = true
  } else if (firebasePathSegment === NAME_NEWS_BANNERS) {
    isLoadingNews.value = true
  } else if (firebasePathSegment === NAME_BACKGROUND_BANNERS) {
    isLoadingBackground.value = true
  }

  await setDoc(doc(db, "banners", firebasePathSegment), data)

  if (firebasePathSegment === NAME_TOP_BANNERS) {
    isLoadingTopBanners.value = false
  } else if (firebasePathSegment === NAME_NEWS_BANNERS) {
    isLoadingNews.value = false
  } else if (firebasePathSegment === NAME_BACKGROUND_BANNERS) {
    isLoadingBackground.value = false
  }
}

onMounted(async () => {
  store.setLoading(true)
  startedValue.value = await getDocs(collection(db, "banners"));
  startedValue.value.forEach((doc) => {
    startedValue.value[doc.id] = doc.data()
  });
  store.setLoading(false)
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <BannersMultiple :banners-info="startedValue[NAME_TOP_BANNERS]"
                     @save-changes="saveChanges($event, NAME_TOP_BANNERS)" firebasePathName="top-banners"
                     :loading="isLoadingTopBanners" title="На головній верх" class="mb-5"/>

    <BannerBackground :banners-info="startedValue[NAME_BACKGROUND_BANNERS]" firebasePathName="background-banner"
                      @save-changes="saveChanges($event, NAME_BACKGROUND_BANNERS)" class="mb-5"/>


    <BannersMultiple :banners-info="startedValue[NAME_NEWS_BANNERS]"
                     @save-changes="saveChanges($event, NAME_NEWS_BANNERS)" firebasePathName="news-banners"
                     :loading="isLoadingNews" title="На головній новини, акції" class="mb-5"/>
  </template>
</template>