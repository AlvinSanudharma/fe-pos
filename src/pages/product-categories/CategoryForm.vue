<script setup lang="ts">
import { createCategory } from "@/api/product-categories.api";
import router from "@/router";
import {
  Button,
  FileUpload,
  InputText,
  Message,
  Textarea,
  Toast,
  useToast,
} from "primevue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const toast = useToast();

const loading = ref(false);
const errors = ref<Record<string, string[]>>({});

const form = ref({
  name: "",
  description: "",
});

const categoryId = computed<number | null>(() => {
  return route.params.id ? Number(route.params.id) : null;
});

const isEdit = computed(() => !!categoryId.value);

const selectedFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const onFileSelect = (event: { files: File[] }) => {
  const file = event.files[0];

  if (!file) return;

  selectedFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const submit = async () => {
  loading.value = true;

  try {
    await createCategory(form.value);

    toast.add({
      severity: "success",
      summary: "Category Created",
      detail: `The category "${form.value.name}" has been successfully created.`,
      life: 1000,
    });

    setTimeout(() => {
      router.back();
    }, 1000);
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors || {};
    } else {
      // Handle other types of errors (e.g., network errors)
      toast.add({
        severity: "error",
        summary: "Create Category Failed",
        detail:
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        life: 1000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-surface-50 font-sans text-surface-900">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 mb-1">
          <span v-if="isEdit"> Edit Category </span>
          <span v-else> Create Category </span>
        </h1>
        <p class="text-sm text-surface-500">
          <span v-if="isEdit"> Edit product categgory </span>
          <span v-else> Create a new product category </span>
        </p>
      </div>

      <Button as-child v-slot="slotProps">
        <RouterLink
          :to="{ name: 'product-categories' }"
          :class="slotProps.class"
        >
          <i class="pi pi-arrow-left"></i>
          Back</RouterLink
        >
      </Button>
    </div>
    <div class="bg-white rounded-2xl border border-surface-200 overflow-hidden">
      <form @submit.prevent="submit">
        <div
          class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          <div class="md:col-span-4 flex flex-col gap-4">
            <label for="" class="text-sm font-semibold text-surface-900">
              Category Image
            </label>
            <div
              class="w-full aspect-square rounded-xl bg-surface-50 border-2 border-dashed border-surface-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary-500 transition-colors"
            >
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt=""
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="flex flex-col items-center gap-2 text-surface-400"
              >
                <i class="pi pi-image text-4xl opacity-50"></i>
                <span class="text-sm font-medium">No image selected</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <FileUpload
                mode="basic"
                @select="onFileSelect"
                :auto="false"
                accept="image/*"
                :max-file-size="2000000"
                choose-label="Choose Image"
                class="w-full"
              />
              <small class="text-surface-500 text-xs text-center">
                Image must be in JPG or PNG format and less than 2MB
              </small>
            </div>
          </div>
          <div class="md:col-span-8 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label for="email" class="font-medium text-surface-900"
                >Name <span class="text-red-500">*</span></label
              >
              <InputText
                type="text"
                id="name"
                fluid
                class="bg-surface-50! focus:bg-white! border-surface-200"
                v-model="form.name"
                placeholder="Enter category name"
                :invalid="!!errors.name"
              />
              <Message
                v-if="errors.name"
                severity="error"
                size="small"
                variant="simple"
                >{{ errors.name[0] }}</Message
              >
            </div>
            <div class="flex flex-col gap-2">
              <label for="email" class="font-medium text-surface-900"
                >Description</label
              >
              <Textarea
                type="text"
                id="description"
                fluid
                class="bg-surface-50! focus:bg-white! border-surface-200"
                v-model="form.description"
                placeholder="Enter category description"
                rows="6"
              />
            </div>

            <div
              class="flex justify-end pt-6 mt-auto border-t border-surface-100"
            >
              <div class="flex gap-3">
                <Button
                  label="Cancel"
                  severity="secondary"
                  @click="router.back()"
                />
                <Button
                  v-if="!loading"
                  type="submit"
                  label="Save Category"
                  class="p-button-primary"
                  icon="pi pi-check"
                />
                <Button
                  v-else
                  type="submit"
                  label="Loading..."
                  class="p-button-primary"
                  icon="pi pi-check"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Toast />
</template>
