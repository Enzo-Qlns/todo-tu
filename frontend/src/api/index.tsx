import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Check status response
api.interceptors.response.use(
    (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(response);
        }
    },
    (error) => Promise.reject(error)
);

export default api