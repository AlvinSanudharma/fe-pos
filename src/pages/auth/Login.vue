<script setup lang="ts">
import { Button, InputText } from "primevue";
import { reactive } from "vue";

const form = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-surface-50 px-4 py-10"
  >
    <div class="w-full max-w-100">
      <div class="bg-white p-8 rounded-2xl shadow-xl border border-surface-100">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200 mx-auto mb-4"
          >
            <i class="pi pi-bolt text-2xl"></i>
          </div>
          <h1 class="text-2xl text-surface-900 mb-2 font-bold">
            Welcome Back!
          </h1>
          <p class="text-surface-500">Please sign in to your account</p>
        </div>
        <form action="" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium text-surface-900"
              >Email <span class="text-red-500">*</span></label
            >
            <InputText
              type="email"
              id="email"
              v-model="form.email"
              fluid
              class="bg-surface-50! focus:bg-white! border-surface-200"
              placeholder="Enter your email"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="font-medium text-surface-900"
              >Password <span class="text-red-500">*</span></label
            >
            <InputText
              type="password"
              id="password"
              v-model="form.password"
              fluid
              class="bg-surface-50! focus:bg-white! border-surface-200"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" label="Login" fluid class="mt-2" />
        </form>
      </div>
    </div>
  </div>
</template>
