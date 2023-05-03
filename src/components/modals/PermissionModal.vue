<script setup>
import {useModalStore} from "../../stores/modal";
import {computed} from "vue";

const DEFAULT_MODAL_TITLE = 'Modal'

const store = useModalStore()

const modalTitle = computed(() => {
  if (store.data && store.data.title) {
    return store.data.title
  } else return DEFAULT_MODAL_TITLE
})

const modalText = computed(() => {
  if (store.data && store.data.text) {
    return store.data.text
  } else return null
})
</script>

<template>
  <Teleport to="body">
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button @click="store.closeModal(false)" type="button" class="close" data-dismiss="modal" aria-label="Close modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="modalText" class="modal-body">
            <p>{{ modalText }}</p>
          </div>
          <div class="modal-footer">
            <button @click="store.closeModal(true)" type="button" class="btn btn-primary">Підтвердити</button>

            <button @click="store.closeModal(false)" type="button" class="btn btn-secondary" data-dismiss="modal">Відмінити
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.modal {
  display: block;
}
</style>
