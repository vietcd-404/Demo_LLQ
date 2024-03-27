import instance from "./api";

export const findAllProduct = async (page, size) => {
  return await instance.get(`/get-all?page=${page}&size=${size}`);
};

export const findAllProductProcerduce1 = async (product) => {
  return await instance.post("/product/search5", product);
};

export const addProduct = async (product) => {
  return await instance.post("/product/add", product);
};

export const detailProduct = async (id) => {
  return await instance.get(`/product/detail?id=${id}`);
};

export const updateProduct = async (product, id) => {
  return await instance.put(`/product/update?id=${id}`, product);
};

export const deleteProduct = async (id) => {
  return await instance.delete(`/product/delete?id=${id}`);
};
