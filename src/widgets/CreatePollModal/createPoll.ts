import { axiosInstance } from "../../../api";
import CreatePollForm, { IPoll } from "./CreatePollForm";

export const createPoll = async (poll: IPoll) => {
  return axiosInstance.post<IPoll>(`/polls`, {
    title: poll.name,
    questions: poll.questions.map((qst) => ({
      text: qst.text,
      options: qst.answers.map((ans) => ans.text),
    })),
    categoryId: poll.category?.id,
    tags: poll.tags,
  });
};
