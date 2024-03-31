import * as axios from "axios";
import baseURL from "./config";

const instance = axios.default.create({
  withCredentials: true,
  baseURL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
