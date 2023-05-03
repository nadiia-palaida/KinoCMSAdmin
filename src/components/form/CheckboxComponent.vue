<script setup>
const props = defineProps({
  options: {type: Array, required: true},
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])

function updateValue(checked, value) {
  if(checked) {
    if(!props.modelValue.includes(value)) {
      emit('update:modelValue', [...props.modelValue, value])
    }
  } else {
    if(props.modelValue.includes(value)) {
      emit('update:modelValue', [...props.modelValue.filter(item => item !== value)])
    }
  }
}
</script>

<template>
  <div v-for="option in options" class="input-group mb-3 mr-3">
    <div class="input-group-prepend">
      <div class="input-group-text">
        <label>
          <input type="checkbox" @change="updateValue($event.target.checked, option.value)" :checked="modelValue.includes(option.value)"
                 aria-label="Checkbox for following text input">

          <span class="ml-2">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
