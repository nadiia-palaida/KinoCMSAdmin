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

const bannerColor = ref(null)
const bannerFile = ref({
  file: '',
  fileId: ''
})

const activeOption = ref(null)

function deleteBanner() {
  console.log('delete banner')

  bannerFile.value = {
    file: '',
    fileId: ''
  }
}

async function saveChanges() {
  let bannerItem = null

  if (activeOption.value === TYPE_BACKGROUND_PHOTO) {
    bannerItem = bannerFile.value
    bannerItem.file = await fileExist(bannerFile.value.fileId, props.firebasePathName) ? bannerFile.value.file : await uploadFile(`${props.firebasePathName}/${bannerFile.value.fileId}`, bannerFile.value.file)
  } else {
    bannerItem = bannerColor.value
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
  } else {
    activeOption.value = props.bannersInfo.type

    if (props.bannersInfo.type === TYPE_BACKGROUND_PHOTO) {
      if (props.bannersInfo.banner && props.bannersInfo.banner.hasOwnProperty('file')) {
        bannerFile.value = props.bannersInfo.banner
      }
    } else if (props.bannersInfo.type === TYPE_BACKGROUND_COLOR) {
      bannerColor.value = props.bannersInfo.banner
    }
  }
})
</script>

<template>
  <div class="admin__section">
    <h2 class="text-center mb-4">Банер на фоні</h2>

    <div class="admin__block shadow-lg rounded p-3">
      <div class="mb-4">Размер: 2000х3000</div>

      <Form @submit="saveChanges">
        <div class="d-flex">
          <RadioComponent v-model="activeOption" :options="backgroundOptions" name="background-banner-radio"
                          class="mr-4"/>

          <ImageUpload v-show="activeOption === TYPE_BACKGROUND_PHOTO" v-model="bannerFile" :hasUrl="false" @deleteImage="deleteBanner"
                       :hasText="false" name="banner-background-image" class="col-2"/>

          <div v-show="activeOption === TYPE_BACKGROUND_COLOR">
            <label>
              <span class="mr-2">Вибрати колір</span>
              <input type="color" v-model="bannerColor"/>
            </label>

            <div class="choose-color" :style="`background: ${bannerColor}`"></div>
          </div>
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
