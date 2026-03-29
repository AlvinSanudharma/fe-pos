<script setup lang="ts">
import { useProductCategoryStore } from "@/stores/product-category.store";
import { storeToRefs } from "pinia";
import { Button, Column, DataTable } from "primevue";
import { onMounted } from "vue";

const productCategoryStore = useProductCategoryStore();
const { fetch } = productCategoryStore;
const { items, loading } = storeToRefs(productCategoryStore);

onMounted(() => {
  fetch();
});
</script>

<template>
  <div class="min-h-screen bg-surface-50 font-sans text-surface-900">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 mb-1">
          Product Categories
        </h1>
        <p class="text-sm text-surface-500">
          The list here shows all the product
        </p>
      </div>

      <Button as-child v-slot="slotProps">
        <RouterLink :to="{}" :class="slotProps.class">Add Category</RouterLink>
      </Button>
    </div>
    <div class="bg-white rounded-2xl border border-surface-200 p-2">
      <DataTable
        :columns="[]"
        :value="items"
        :loading="loading"
        data-key="id"
        class="clean-table"
        :row-hover="true"
      >
        <Column field="name" header="Name" class="min-w-[16rem]">
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <div class="relative" v-if="data.image !== null">
                <img
                  :src="data.image"
                  :alt="data.name"
                  class="w-10 h-10 rounded-full object-cover bg-surface-100"
                />
              </div>
              <span class="font-semibold text-surface-900">
                {{ data.name }}
              </span>
            </div>
          </template>
        </Column>
        <Column field="description" header="Description" />
        <Column header="Actions" style="width: 5rem">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Button
                icon="pi pi-trash"
                text
                rounded
                severity="danger"
                class="w-9! h-9! border-surface-200! text-surface-200! hover:text-red-600! hover:border-red-600! bg-white hover:bg-primary-50"
              ></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
