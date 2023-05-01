<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  label: {type: String},
  options: {type: Array, required: true},
  modelValue: {},
  name: {type: String, required: true},
  rules: {}
})

defineEmits(['update:modelValue'])

const {errorMessage, value} = useField(() => props.name, props.rules);
</script>

<template>
  <div class="input-group mb-4">
    <div v-if="label" class="input-group-prepend">
      <label class="input-group-text" :for="name">{{ label }}</label>
    </div>

    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" class="custom-select"
            :name="name" :id="name">
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>

    <span v-if="errorMessage" class="input__error">{{ errorMessage }}</span>
  </div>
</template>
