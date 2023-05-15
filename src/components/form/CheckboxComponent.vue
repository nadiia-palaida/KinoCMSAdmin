<script setup>
import {useField} from 'vee-validate'

const props = defineProps({
  name: {type: String, required: true},
  options: {type: Array, required: true},
  modelValue: {},
  rules: {},
  errors: {type: Array},
})

const emit = defineEmits(['update:modelValue'])

function updateValue(checked, value) {
  if (checked) {
    if (!props.modelValue.includes(value)) {
      emit('update:modelValue', [...props.modelValue, value])
    }
  } else {
    if (props.modelValue.includes(value)) {
      emit('update:modelValue', [...props.modelValue.filter(item => item !== value)])
    }
  }
}

const {errorMessage, value} = useField(() => props.name, props.rules);
</script>

<template>
  <div class="d-flex position-relative mb-3">
    <div v-for="option in options" class="input-group mr-3">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <label>
            <input type="checkbox" :name="name" @change="updateValue($event.target.checked, option.value)"
                   :checked="modelValue.includes(option.value)" aria-label="Checkbox for following text input">

            <span class="ml-2">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <span v-if="errorMessage" class="input__error error">{{ errorMessage }}</span>
  </div>
</template>
