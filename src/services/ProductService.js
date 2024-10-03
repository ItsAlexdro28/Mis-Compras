import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/product';

export const listCategories = () => axios.get(REST_API_BASE_URL);

export const createCategory = (product) => axios.post(REST_API_BASE_URL, product);

export const getCategory = (productId) => axios.get(REST_API_BASE_URL + '/' + productId)

export const updateCategory = (productId, product) => axios.put(REST_API_BASE_URL + '/' + productId, product);

export const deleteCategory = (productId) => axios.delete(REST_API_BASE_URL + '/' + productId);
