import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://portfolioedward-production.up.railway.app/api/v1',
    headers: { 
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // ✅ Required for sending credentials (cookies, auth headers)
});

// ✅ Automatically attach the latest access token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
