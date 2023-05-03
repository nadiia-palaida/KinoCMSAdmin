<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useModalStore} from "./stores/modal";
import {computed, defineAsyncComponent} from "vue";

const store = useModalStore()

const modalComponent = computed(() => {
  if(store.component) {
    return defineAsyncComponent(() => import(`./components/modals/${store.component}.vue`))
  } else {
    return ''
  }
})
</script>

<template>
  <RouterView />

  <component v-if="modalComponent" :is="modalComponent"/>
</template>

<style>
</style>
