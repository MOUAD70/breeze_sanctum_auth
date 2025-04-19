import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    'Accept': "application/json",
  },
});
