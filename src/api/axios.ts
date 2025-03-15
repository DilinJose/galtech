import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // if using cookies for authentication
});