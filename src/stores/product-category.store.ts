import { getCategories } from "@/api/product-categories.api";
import type { ProductCategory } from "@/types/product-categories";
import { defineStore } from "pinia";

export const useProductCategoryStore = defineStore("product-category", {
  state: () => ({
    items: [] as ProductCategory[],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    page: 1,
    limit: 10,
    search: "",
    loading: false,
  }),
  actions: {
    async fetch() {
      this.loading = true;

      try {
        const res = await getCategories({
          page: this.page,
          limit: this.limit,
          search: this.search,
        });

        this.items = res.data.data.items;
        this.pagination = res.data.data.pagination;
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        this.loading = false;
      }
    },

    setLimit(limit: number) {
      this.limit = limit;
      this.page = 1;

      this.fetch();
    },
  },
});
