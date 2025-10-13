import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.uptimeclient.tech",
  withCredentials: true,
});

export default instance;