import { defineStore } from "pinia";

export const useProductCategoryStore = defineStore("product-category", {
  state: () => ({
    items: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await fetch("/api/product-categories");
        if (!response.ok) {
          throw new Error("Failed to fetch product categories");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
