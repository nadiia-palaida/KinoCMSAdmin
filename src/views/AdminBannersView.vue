<script setup>
import AdminLayout from "../layouts/AdminLayout.vue"
import BannersMultiple from "../components/banners/BannersMultiple.vue"
import BannerBackground from "../components/banners/BannerBackground.vue";
import {doc, getDocs, collection, setDoc} from "firebase/firestore"
import {db, fileExist, storage, uploadFile, deleteOldImage} from "../firebase"
import {computed, ref, onMounted, onBeforeMount, onBeforeUnmount} from 'vue'
import {useGeneralStore} from "../stores/general";
import {listAll} from "firebase/storage";

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
  if (firebasePathSegment === NAME_TOP_BANNERS) {
    isLoadingTopBanners.value = true
  } else if (firebasePathSegment === NAME_NEWS_BANNERS) {
    isLoadingNews.value = true
  } else if (firebasePathSegment === NAME_BACKGROUND_BANNERS) {
    isLoadingBackground.value = true
  }


  //delete old images
  if(data.items) {
    oldImages.value[firebasePathSegment].filter(item => !data.items.includes(item))
  } else if(data.fileId) {
    oldImages.value[firebasePathSegment].filter(item => !data.fileId === item)
  }

  console.log('oldImages.value[firebasePathSegment]', oldImages.value[firebasePathSegment])


  oldImages.value[firebasePathSegment].forEach(item => {
    deleteOldImage(item, firebasePathSegment)
  })

  //add to firebase
  await setDoc(doc(db, "banners", firebasePathSegment), data)


  //set old images
  if(data.items) {
    oldImages.value[firebasePathSegment] = data.items.map(item => item.fileId)
  } else if(data.fileId) {
    oldImages.value[firebasePathSegment].push(data.fileId)
  }

  if (firebasePathSegment === NAME_TOP_BANNERS) {
    isLoadingTopBanners.value = false
  } else if (firebasePathSegment === NAME_NEWS_BANNERS) {
    isLoadingNews.value = false
  } else if (firebasePathSegment === NAME_BACKGROUND_BANNERS) {
    isLoadingBackground.value = false
  }
}

onBeforeMount(async () => {
  store.setLoading(true)
  startedValue.value = await getDocs(collection(db, "banners"));
  startedValue.value.forEach((doc) => {
    startedValue.value[doc.id] = doc.data()
    if(doc.data().items) {
      oldImages.value[doc.id] = doc.data().items.map(item => item.fileId)
    } else if(doc.data().fileId) {
      oldImages.value[doc.id].push(doc.data().fileId)
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
    <pre>
      {{ oldImages }}
    </pre>

    <BannersMultiple :banners-info="startedValue[NAME_TOP_BANNERS]"
                     @save-changes="saveChanges($event, NAME_TOP_BANNERS)" :firebasePathName="NAME_TOP_BANNERS"
                     :loading="isLoadingTopBanners" title="На головній верх" class="mb-5"/>

    <BannerBackground :banners-info="startedValue[NAME_BACKGROUND_BANNERS]" :firebasePathName="NAME_BACKGROUND_BANNERS"
                      @save-changes="saveChanges($event, NAME_BACKGROUND_BANNERS)" class="mb-5"/>


    <BannersMultiple :banners-info="startedValue[NAME_NEWS_BANNERS]" :hasText="false"
                     @save-changes="saveChanges($event, NAME_NEWS_BANNERS)" :firebasePathName="NAME_NEWS_BANNERS"
                     :loading="isLoadingNews" title="На головній новини, акції" class="mb-5"/>
  </template>
</template>