import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  
  axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) =>  {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
          }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('⚠️ Unauthorized - redirecting to login...');
        
      }
  
      if (error.response?.status === 403) {
        console.warn('❌ Forbidden - thiếu quyền truy cập');
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosClient;