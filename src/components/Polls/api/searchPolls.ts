import { axiosInstance } from '../../../../api';
import { IPoll } from './usePolls';

export const searchPolls = async (searchValue: string) => {
	try {
		const { data: searchedPolls } = await axiosInstance.get<IPoll[]>(
			`/polls/search/?query=text&selectedCategory=id`,
			{
				params: searchValue,
			}
		);
		console.log('test');
		return searchedPolls;
	} catch (err) {
		console.log(err);
	}
};
