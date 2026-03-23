<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { Button, InputText, Message } from "primevue";
import { reactive, ref } from "vue";

const auth = useAuthStore();
const { loading } = storeToRefs(auth);

const error = ref<string | null>("");
const form = ref({
  email: "",
  password: "",
});

async function login() {
  if (!form.value.email || !form.value.password) {
    error.value = "Email and password are required.";
    return;
  }

  error.value = null;

  try {
    await auth.login(form.value.email, form.value.password);

    router.push("/");
  } catch (err) {
    if (err !== null) {
      if (typeof err === "object" && "message" in err) {
        error.value = err.message as string;
      } else {
        error.value = "An unexpected error occurred. Please try again.";
      }
    } else {
      error.value = "An unexpected error occurred. Please try again.";
    }
  }
}
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
        <form @submit.prevent="login" class="flex flex-col gap-5">
          <Message
            v-if="error"
            severity="error"
            class="mb-4"
            :closable="false"
            >{{ error }}</Message
          >
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
          <Button
            type="submit"
            label="Login"
            fluid
            class="mt-2"
            :loading="loading"
          />
        </form>
      </div>
    </div>
  </div>
</template>
