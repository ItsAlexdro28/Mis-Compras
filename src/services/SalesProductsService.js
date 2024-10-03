import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/salesProducts';

export const listCategories = () => axios.get(REST_API_BASE_URL);

export const createCategory = (salesProducts) => axios.post(REST_API_BASE_URL, salesProducts);

export const getCategory = (salesProductsId) => axios.get(REST_API_BASE_URL + '/' + salesProductsId)

export const updateCategory = (salesProductsId, salesProducts) => axios.put(REST_API_BASE_URL + '/' + salesProductsId, salesProducts);

export const deleteCategory = (salesProductsId) => axios.delete(REST_API_BASE_URL + '/' + salesProductsId);
