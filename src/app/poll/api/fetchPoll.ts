import { IPoll, IPollResponse } from "@/components/Polls/api/models";
import { enrichPollCategory } from "@/components/Polls/api/fetchCategoryById";
import { axiosInstance } from "../../../../api";
import { pollMapper } from "@/components/Polls/api/pollMapper";

export const fetchPoll = async (id: string): Promise<IPoll> => {
  const { data } = await axiosInstance.get<IPollResponse>(`/polls/${id}`);
  const poll = pollMapper.pollResponseToPoll(data);
  return enrichPollCategory(poll, data.categoryId);
};
