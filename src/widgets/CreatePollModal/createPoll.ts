import { axiosInstance } from "../../../api";
import CreatePollForm, { IPoll } from "./CreatePollForm";

export const createPoll = async (
  poll: IPoll,
  categoryName?: string,
  categoryId?: string
) => {
  return axiosInstance.post<IPoll>(`/polls`, {
    title: poll.name,
    questions: poll.questions.map((qst) => ({
      text: qst.text,
      options: qst.answers.map((ans) => ans.text),
    })),
    categoryId: categoryId ?? poll.category?.id,
    categoryName: categoryName,
    tags: poll.tags,
  });
};
