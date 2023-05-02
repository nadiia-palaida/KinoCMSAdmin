<script setup>
import RadioComponent from "../form/RadioComponent.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import ImageUpload from "../form/ImageUpload.vue";
import {fileExist, uploadFile} from "../../firebase";
import {Form} from "vee-validate"


const TYPE_BACKGROUND_PHOTO = 'photo'
const TYPE_BACKGROUND_COLOR = 'color'

const props = defineProps({
  bannersInfo: {type: Object, required: true},
  loading: {type: Boolean, default: false},
  firebasePathName: {type: String, required: true}
})

const emit = defineEmits(['saveChanges'])

const backgroundOptions = [
  {
    label: ' Фото на фон',
    value: 'photo'
  },
  {
    label: 'Просто фон',
    value: 'color'
  },
]

const banner = ref(null)

const activeOption = ref(null)

async function saveChanges() {
  let bannerItem = null

  console.log('isFile', banner.value)
  console.log('firebasePathName', props.firebasePathName)


  if (banner.value.hasOwnProperty('file')) {
    bannerItem =  banner.value.fileId
    bannerItem.file = await fileExist(banner.value.fileId, props.firebasePathName) ? banner.value.file : await uploadFile(`${props.firebasePathName}/${banner.value.fileId}`, banner.value.file)
  } else {
    bannerItem = banner.value
  }

  const result = {
    type: activeOption.value,
    banner: bannerItem
  }

  emit('saveChanges', result)
}

onBeforeMount(() => {
  if (!props.bannersInfo.type) {
    activeOption.value = backgroundOptions[0].value
  }

  if (props.bannersInfo.type === TYPE_BACKGROUND_PHOTO && !props.bannersInfo.banner) {
    banner.value = {
      file: '',
      fileId: ''
    }
  }

  console.log(' banner.value ',  banner.value )
  console.log(' banner.value ',  banner.value )
})
</script>

<template>
  <div class="admin__section">
    <h2 class="text-center mb-4">Банер на фоні</h2>

    <div class="admin__block shadow-lg rounded p-3">
      <div class="mb-4">Размер: 2000х3000</div>

      <Form @submit="saveChanges">
        <div class="d-flex">
          <RadioComponent v-model:modelValue="activeOption" :options="backgroundOptions" name="background-banner-radio"
                          class="mr-4"/>

          <ImageUpload v-show="activeOption === TYPE_BACKGROUND_PHOTO" v-model="banner" :hasUrl="false" :hasText="false"
                       class="col-2"/>
        </div>

        <button type="submit" class="btn btn-success">
          <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>Зберегти</span>
        </button>
      </Form>
    </div>
  </div>
</template>
