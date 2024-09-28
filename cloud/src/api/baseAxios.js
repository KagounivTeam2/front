import axios from "axios";

export const baseAxios = axios.create({});

baseAxios.interceptors.request.use(
  async (config) => {
    config.baseURL = process.env.REACT_APP_BASE_URL;
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  },
  (err) => console.error(err)
);
