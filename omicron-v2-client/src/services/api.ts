import axios from 'axios';

// criação da conexão com a api
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
