import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use(
  (config) => {
    config.baseURL = 'https://pokeapi.co/api/v2/';
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
