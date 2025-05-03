import axios from "axios";
import { AuthService } from "../services/AuthService";

const Axios = axios.create({
  baseURL: "https://api-v1-plinc.fred-host.com/administrator",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      AuthService.logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
