import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://portfolioedward-production.up.railway.app/api/v1',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,  // Ensure cookies/auth headers work
});

export default axiosInstance;