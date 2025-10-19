import { axiosInstance } from "../../../api";

export const sendCode = async (email: string) => {
  const { data } = await axiosInstance.post(`/auth/sendCode`, {
    email: email,
  });
  return data;
};
