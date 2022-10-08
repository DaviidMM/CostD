import axios from 'axios';
import { getUserToken } from '../firebase/client';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(async (config) => {
  const token = await getUserToken();
  config.headers = {
    Authorization: `Bearer ${token}`
  };
  return config;
});

export default api;
