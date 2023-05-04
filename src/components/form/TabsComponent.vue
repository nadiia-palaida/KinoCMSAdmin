<script setup>
const props = defineProps({
  options: {type: Array, required: true},
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <ul class="nav nav-pills">
    <li v-for="option in options" class="nav-item tab-item" :class="{active: modelValue === option.value}">
      <button @click="updateValue(option.value)" class="nav-link"> {{option.label}}</button>
    </li>
  </ul>
</template>
