import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;