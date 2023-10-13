import axios from "axios";

let API_BASE_URL;

if (process.env.NODE_ENV === "development") {
  API_BASE_URL = process.env.REACT_APP_API_URL;
} else if (process.env.NODE_ENV === "production") {
  API_BASE_URL = "https://back.ingenieurmarseilleaix.fr/";
} else {
  throw new Error("Environnement inconnu");
}
export const apiUrl = `${API_BASE_URL}/api`;
export const api_Url = `${API_BASE_URL}/api/auth`;
export const api_url_pic = `${API_BASE_URL}/storage/pictures/`;

const axiosClient = axios.create({
  baseURL: api_Url,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("userInfo");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
