import { IPoll, IPollResponse } from "@/components/Polls/api/models";
import { axiosInstance } from "../../../../api";
import { pollMapper } from "@/components/Polls/api/pollMapper";

export const fetchPoll = async (id: string): Promise<IPoll> => {
  const { data } = await axiosInstance.get<IPollResponse>(`/polls/${id}`);
  return pollMapper.pollResponseToPoll(data);
};
