import api from "./axios";

export const meApi = () => api.get("/me");
export const logoutApi = () => api.post("/logout");
