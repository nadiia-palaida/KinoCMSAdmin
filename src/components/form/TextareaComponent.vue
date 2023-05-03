<script setup>
import {useField} from 'vee-validate';

defineEmits(['update:modelValue'])

const props = defineProps({
  type: {type: String, default: 'text'},
  placeholder: {type: String},
  errors: {type: Array},
  label: {type: String},
  name: {type: String, required: true},
  modelValue: {required: true},
  rules: {},
})

const {errorMessage, value} = useField(() => props.name, props.rules);
</script>

<template>
  <div class="input">
    <div class="input__wrap">
      <label class="input__label d-flex align-items-center">
        <span class="input__label-text mr-1">{{ label }}:</span>

        <span class="input__item-wrap">
            <textarea :value="modelValue" :name="name" :type="type" :placeholder="placeholder"
                      @input="$emit('update:modelValue', $event.target.value)" class="form-control input__item w-100"
                      rows="6"></textarea>

          <span v-if="errorMessage" class="input__error error">{{ errorMessage }}</span>
        </span>
      </label>
    </div>
  </div>
</template>