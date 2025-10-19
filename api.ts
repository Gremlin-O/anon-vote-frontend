import axios from "axios";
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" }); // or 'indices', 'brackets'
    },
  },
});
