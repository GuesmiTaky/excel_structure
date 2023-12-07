import axios from "axios";

import * as categoryActions from "./actions/categoryActions";
import * as newsActions from "./actions/newsActions";
import * as partnerActions from "./actions/partnerActions";
import * as projectActions from "./actions/projectActions";

let API_BASE_URL;

if (process.env.NODE_ENV === "development") {
  API_BASE_URL = process.env.REACT_APP_API_URL;
} else if (process.env.NODE_ENV === "production") {
  API_BASE_URL = "https://back.bet-aix-marseille.fr";
} else {
  console.warn("Environnement inconnu. Veuillez vérifier vos configurations.");
  API_BASE_URL = "";
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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      categoryActions.removeJwt();
      newsActions.removeJwt();
      partnerActions.removeJwt();
      projectActions.removeJwt();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
