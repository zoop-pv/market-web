import axios from "axios";
import environments from "@/config/environments";

const instanceAxios = axios.create({
  baseURL: environments.provider.baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instanceAxios;
