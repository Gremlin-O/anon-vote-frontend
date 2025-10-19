import { axiosInstance } from "../../../../api";

export const sendAnswers = async (
  pollId: string,
  answers: Record<string, string>
) => {
  const { data } = await axiosInstance.post(`/polls/${pollId}/submit`, {
    answers: answers,
  });
  return data;
};
