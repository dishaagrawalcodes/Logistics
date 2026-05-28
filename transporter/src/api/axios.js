import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api" // your backend url
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("transportToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
