import { IPollResponse } from '@/components/Polls/api/models';
import { axiosInstance } from '../../../api';
import CreatePollForm, { IPoll } from './CreatePollForm';
import { AxiosResponse } from 'axios';

export const createPoll = async (poll: IPoll, categoryName?: string, categoryId?: string) => {
	const { data } = await axiosInstance.post<IPollResponse, AxiosResponse<IPollResponse>>(`/polls`, {
		title: poll.name,
		questions: poll.questions.map((qst) => ({
			text: qst.text,
			options: qst.answers.map((ans) => ans.text),
		})),
		categoryId: categoryId ?? poll.category?.id,
		categoryName: categoryName,
		tags: poll.tags,
	});

	return data;
};
