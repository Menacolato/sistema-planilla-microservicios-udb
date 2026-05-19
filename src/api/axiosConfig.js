import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Tu puerto y context-path de Spring Boot
});

// Interceptor para inyectar el Token JWT automáticamente en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;