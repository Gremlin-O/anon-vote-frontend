import { IPoll, IPollCategory, IPollResponse } from "./models";

const mapCategory = (poll: IPollResponse): IPollCategory | undefined => {
  const name = poll.category?.name ?? poll.categoryName;
  const path = poll.category?.path ?? poll.categoryPath;
  const id = poll.category?.id ?? poll.categoryId;

  if (name) {
    return { id, name, path };
  }

  if (id) {
    return { id, name: "", path };
  }

  return undefined;
};

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
    category: mapCategory(poll),
    isAnswered: poll.answered,
  }),
};
