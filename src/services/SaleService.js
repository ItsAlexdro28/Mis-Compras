import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/sale';

export const listSales = () => axios.get(REST_API_BASE_URL);

export const createSale = (sale) => axios.post(REST_API_BASE_URL, sale);

export const getSale = (saleId) => axios.get(REST_API_BASE_URL + '/' + saleId);

export const updateSale = (saleId, sale) => axios.put(REST_API_BASE_URL + '/' + saleId , sale);

export const deleteSale = (saleId) => axios.delete(REST_API_BASE_URL + '/' + saleId);
