import axios from "axios";

const api = axios.create({
  baseURL: "https://viki-backend-e3jp.onrender.com"
});

export default api;