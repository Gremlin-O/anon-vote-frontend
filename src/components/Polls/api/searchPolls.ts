import { axiosInstance } from "../../../../api";
import { IPoll, IPollResponse } from "./models";
import { enrichPollCategory } from "./fetchCategoryById";
import { pollMapper } from "./pollMapper";

interface ISearchPollResponseApi {
  content: IPollResponse[];
  hasNextPage: boolean;
}

interface SearchPollsResponseFront {
  content: IPoll[];
  hasNextPage: boolean;
}

export const searchPolls = async (
  title: string,
  tags: string[],
  page: number,
  categoryId?: string
): Promise<SearchPollsResponseFront> => {
  const { data } = await axiosInstance.get<ISearchPollResponseApi>(
    `/polls/search`,
    {
      params: {
        title: title,
        tags: tags,
        page: page,
        size: 3,
        categoryId,
      },
    }
  );
  const polls = data.content.map(pollMapper.pollResponseToPoll);
  const content = await Promise.all(
    polls.map((poll, index) =>
      enrichPollCategory(poll, data.content[index].categoryId),
    ),
  );

  return {
    content,
    hasNextPage: data.hasNextPage,
  };
};
