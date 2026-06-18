import { axiosInstance } from "../../../../api";
import { IPollResponse } from "./models";

export const upvotePoll = async (pollId: string) => {
  await axiosInstance.post(`/polls/${pollId}/votes/up`);
};

export const downvotePoll = async (pollId: string) => {
  await axiosInstance.post(`/polls/${pollId}/votes/down`);
};

export const cancelVotePoll = async (pollId: string) => {
  await axiosInstance.post(`/polls/${pollId}/votes/cancel`);
};

export const fetchPollVoteCount = async (pollId: string): Promise<number> => {
  const { data } = await axiosInstance.get<IPollResponse>(`/polls/${pollId}`);
  return data.votes ?? 0;
};
