<script setup lang="ts">
import { Button } from "primevue";
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
  </div>
</template>
