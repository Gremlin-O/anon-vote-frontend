import { axiosInstance } from "../../../../api";
import { IPoll, IPollResponse } from "./models";
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
  return {
    content: data.content.map(pollMapper.pollResponseToPoll),
    hasNextPage: data.hasNextPage,
  };
};
