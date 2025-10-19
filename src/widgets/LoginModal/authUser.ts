import { axiosInstance } from "../../../api";

export const authUser = async (email: string, code: string) => {
  const { data } = await axiosInstance.post(`/auth`, {
    email: email,
    code: code,
  });
  return data;
};
