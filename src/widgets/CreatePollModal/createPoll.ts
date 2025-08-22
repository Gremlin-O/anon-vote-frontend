import { axiosInstance } from '../../../api';
import { IPoll } from './Poll';

export const createPoll = async (poll: IPoll) => {
	try {
		await axiosInstance.post<IPoll>(`/categories/#`, { poll });
	} catch (err) {
		console.log(err);
	}
};
