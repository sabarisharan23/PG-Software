import axios from "axios";

// Base API URL (Adjust this to match your backend API)
const BASE_URL = "http://localhost:3000"; // Fixed URL format

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token if available)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor (Handle errors globally)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Handle Unauthorized (401) or Forbidden (403) errors
//       if (error.response.status === 401) {
//         console.error("Unauthorized! Redirecting to login...");
//         localStorage.removeItem("token"); // Remove invalid token
//         window.location.href = "/login"; // Redirect to login page
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
