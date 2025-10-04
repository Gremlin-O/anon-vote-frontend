import { q } from 'motion/react-m';
import { axiosInstance } from '../../../../api';
import { IPoll } from './usePolls';

interface IQuestion {
	text: string;
	options: string[];
	id: string;
}

interface IPollResponse {
	id: string;
	title: string;
	questions: IQuestion[];
	categoryId: string;
	tags: string[];
}

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
	const { data } = await axiosInstance.get<ISearchPollResponseApi>(`/polls/search`, {
		params: {
			title: title,
			tags: tags,
			page: page,
			size: 3,
			categoryId,
		},
	});
	return {
		content: data.content.map((poll) => ({
			id: poll.id,
			title: poll.title,
			queries: poll.questions.map((qst) => ({
				text: qst.text,
				answers: qst.options,
				id: qst.id,
			})),
			tags: poll.tags,
		})),
		hasNextPage: data.hasNextPage,
	};
};
