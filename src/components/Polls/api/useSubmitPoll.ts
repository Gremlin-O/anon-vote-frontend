import { useCallback } from 'react';
import { axiosInstance } from '../../../../api';
import { IAnswer } from './usePolls';

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
