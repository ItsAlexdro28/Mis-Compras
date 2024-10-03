import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/client';

export const listClients = () => axios.get(REST_API_BASE_URL);

export const createClient = (client) => axios.post(REST_API_BASE_URL, client);

export const getClient = (clientId) => axios.get(REST_API_BASE_URL + '/' + clientId);

export const updateClient = (clientId, client) => axios.put(REST_API_BASE_URL + '/' + clientId, client);

export const deleteClient = (clientId) => axios.delete(REST_API_BASE_URL + '/' + clientId);

