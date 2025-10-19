import { IPoll, IPollResponse } from "./models";

export const pollMapper = {
  pollResponseToPoll: (poll: IPollResponse): IPoll => ({
    id: poll.id,
    title: poll.title,
    queries: poll.questions.map((qst) => ({
      text: qst.text,
      answers: qst.options,
      id: qst.id,
    })),
    tags: poll.tags,
    isAnswered: poll.answered,
  }),
};
