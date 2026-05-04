import { getCategories } from "@/api/product-categories.api";
import type { ProductCategory } from "@/types/product-categories";
import { defineStore } from "pinia";

export const useProductCategoryStore = defineStore("product-category", {
  state: () => ({
    items: [] as ProductCategory[],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    page: 1,
    limit: 10,
    search: "",
    loading: false,
  }),
  getters: {
    currentPage(state) {
      return state.pagination.current_page;
    },
    totalPages(state) {
      return state.pagination.last_page;
    },
  },
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
    setPage(page: number) {
      this.page = page;
      this.fetch();
    },
    setLimit(limit: number) {
      this.limit = limit;
      this.page = 1;

      this.fetch();
    },
    nextPage() {
      if (this.pagination.current_page < this.pagination.last_page) {
        this.page = this.pagination.current_page + 1;
        this.fetch();
      }
    },
    prevPage() {
      if (this.pagination.current_page > 1) {
        this.page = this.pagination.current_page - 1;
        this.fetch();
      }
    },
  },
});
