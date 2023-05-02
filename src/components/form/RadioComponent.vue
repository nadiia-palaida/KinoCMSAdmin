<script setup>
const props = defineProps({
  options: {type: Array, required: true},
  name: {type: String, required: true},
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="radio">
    <div v-for="(option, optionIndex) in options" class="form-check">
      <input class="form-check-input" type="radio" :name="name" :id="`radio-${name}-${optionIndex}`" :checked="option.value === modelValue"
             @change="$emit('update:modelValue', option.value)">
      <label class="form-check-label" :for="`radio-${name}-${optionIndex}`">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
