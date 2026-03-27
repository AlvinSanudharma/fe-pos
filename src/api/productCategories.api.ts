import api from "./axios";

export const getProductCategories = async (params: {
  page?: number;
  search?: string;
  limit?: number;
}) => api.get("/product-categories", { params });
