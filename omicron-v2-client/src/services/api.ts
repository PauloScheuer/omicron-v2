import axios from 'axios';

// criação da conexão com a api
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
