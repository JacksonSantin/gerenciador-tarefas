import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
