import { useCallback } from "react";
import { axiosInstance } from "../../../../api";
import { IAnswer } from "@/widgets/CreatePollModal/CreatePollForm";

export const useSubmitPoll = (pollId: string) => {
  const submitPoll = useCallback(
    async (responses: Record<string, IAnswer>) => {
      return axiosInstance.post(`/polls/${pollId}/submit`, {
        responses: responses,
      });
    },
    [pollId]
  );

  return { submitPoll };
};
