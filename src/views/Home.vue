<script>
import { RouterLink} from 'vue-router'

export default {
  name: "Home"
}
</script>

<template>
  <router-link :to="{name: 'admin-home'}">Admin</router-link>
  <router-link :to="{name: 'client-home'}">Client</router-link>
</template>
