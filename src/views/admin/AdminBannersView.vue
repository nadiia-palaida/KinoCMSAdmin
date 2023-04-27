<script setup>
import AdminLayout from "../../layouts/AdminLayout.vue";
import {useIsFormValid, useValidateForm, Form} from "vee-validate";
import InputComponent from "../../components/admin/form/AdminInputComponent.vue";
import ImageUpload from "../../components/admin/form/ImageUpload.vue";

</script>

<template>
  <AdminLayout>
    <section class="admin__section">
      <h2 class="text-center mb-4">На главной верх</h2>

      <div class="admin__block shadow-lg rounded p-3">
        <div class="admin__switch-wrap">
          <div class="custom-control custom-switch custom-switch-lg admin__switch ml-auto">
            <input type="checkbox" class="custom-control-input" id="customSwitch1">
            <label class="custom-control-label" for="customSwitch1"></label>
          </div>
        </div>

        <div class="mb-4">Размер: 1000х190</div>

        <Form class="admin__form-images">
          <ImageUpload/>
        </Form>
      </div>
    </section>
  </AdminLayout>
</template>