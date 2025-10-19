import { axiosInstance } from "../../../api";

export const logout = async () => {
  const { data } = await axiosInstance.post(`/auth/logout`);
  return data;
};
