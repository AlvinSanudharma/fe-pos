import api from "./axios";

export const getCategories = async (params: {
  page?: number;
  search?: string;
  limit?: number;
}) => api.get("/product-categories", { params });

export const createCategory = async (payload: {
  name: string;
  description?: string;
}) => api.post("/product-categories", payload);

export const deleteCategory = async (id: number) =>
  api.delete(`/product-categories/${id}`);
