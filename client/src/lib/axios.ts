import { API_BASE_URL } from "@/config";
import axios from "axios";

const instance = axios.create({
  baseURL: API_BASE_URL || "https://api.uptimeclient.tech",
  withCredentials: true,
});

export default instance;