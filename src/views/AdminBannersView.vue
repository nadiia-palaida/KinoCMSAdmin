<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import BannersMultiple from '../components/banners/BannersMultiple.vue'
import BannerBackground from '../components/banners/BannerBackground.vue'

import {doc, getDocs, collection, setDoc} from 'firebase/firestore'
import {db, deleteOldImage} from '../firebase'

import {ref, onBeforeMount} from 'vue'
import {useGeneralStore} from '../stores/general'

const startedValue = ref({})

const store = useGeneralStore()

const isLoading = ref(true)
const isLoadingTopBanners = ref(false)
const isLoadingNews = ref(false)
const isLoadingBackground = ref(false)

const oldImages = ref({
  topBanners: [],
  newsBanners: [],
  backgroundBanner: []
})

const NAME_TOP_BANNERS = 'topBanners'
const NAME_NEWS_BANNERS = 'newsBanners'
const NAME_BACKGROUND_BANNERS = 'backgroundBanner'

async function saveChanges(data, firebasePathSegment) {
  switch (firebasePathSegment) {
    case NAME_TOP_BANNERS:
      isLoadingTopBanners.value = true
      break
    case NAME_NEWS_BANNERS:
      isLoadingNews.value = true
      break
    case NAME_BACKGROUND_BANNERS:
      isLoadingBackground.value = true
      break
  }

  //delete old images
  if (data.items && data.items.length) {
    const newImagesArr = data.items.map(item => item.fileId)
  } else if (data.banner.fileId) {
    oldImages.value[firebasePathSegment] = oldImages.value[firebasePathSegment].filter(item => data.banner.fileId !== item)
  }

  let calls = []

  //add to firebase
  calls.push(await setDoc(doc(db, "banners", firebasePathSegment), data))

/*  oldImages.value[firebasePathSegment].forEach(item => {
    calls.push(deleteOldImage(item, firebasePathSegment))
  })*/

  await Promise.all(calls)

  //set old images
  if (data.items && data.items.length) {
    oldImages.value[firebasePathSegment] = data.items.map(item => item.fileId)
  } else if (data.banner.fileId) {
    oldImages.value[firebasePathSegment].push(data.banner.fileId)
  }

  switch (firebasePathSegment) {
    case NAME_TOP_BANNERS:
      isLoadingTopBanners.value = false
      break
    case NAME_NEWS_BANNERS:
      isLoadingNews.value = false
      break
    case NAME_BACKGROUND_BANNERS:
      isLoadingBackground.value = false
      break
  }
}

onBeforeMount(async () => {
  store.setLoading(true)

  startedValue.value = await getDocs(collection(db, "banners"));

  startedValue.value.forEach((doc) => {
    startedValue.value[doc.id] = doc.data()

    if (doc.data().items) {
      oldImages.value[doc.id] = doc.data().items.map(item => item.fileId)
    } else if (doc.data().banner.fileId) {
      oldImages.value[doc.id].push(doc.data().banner.fileId)
    }
  });

  store.setLoading(false)
})
</script>

<template>
  <div v-if="store.isLoading" class="overlay overlay-page">
    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
  </div>

  <template v-else>
    <BannersMultiple :banners-info="startedValue[NAME_TOP_BANNERS]" :name="NAME_TOP_BANNERS"
                     @save-changes="saveChanges($event, NAME_TOP_BANNERS)" :firebasePathName="NAME_TOP_BANNERS"
                     :loading="isLoadingTopBanners" title="На головній верх" class="mb-5"/>

    <BannerBackground :banners-info="startedValue[NAME_BACKGROUND_BANNERS]" :firebasePathName="NAME_BACKGROUND_BANNERS"
                      :name="NAME_BACKGROUND_BANNERS" @save-changes="saveChanges($event, NAME_BACKGROUND_BANNERS)"
                      class="mb-5"/>


    <BannersMultiple :banners-info="startedValue[NAME_NEWS_BANNERS]" :hasText="false"
                     @save-changes="saveChanges($event, NAME_NEWS_BANNERS)" :firebasePathName="NAME_NEWS_BANNERS"
                     :name="NAME_NEWS_BANNERS" :loading="isLoadingNews" title="На головній новини, акції" class="mb-5"/>
  </template>
</template>