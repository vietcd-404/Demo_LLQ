import api from "./api";

export const dangKy = async (dangKy) => {
  return await api.post("/api/auth/signup", dangKy);
};

export const dangNhap = async (username, password) => {
  return await api.post("/api/auth/signin", username, password);
};
