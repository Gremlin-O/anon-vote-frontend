import { axiosInstance } from '../../../../api';

export const exportStats = async (pollId: string, daysBefore: number) => {
	const { data } = await axiosInstance.get(`/polls/${pollId}/dailyStat/export/csv`, {
		params: {
			daysBefore,
		},
	});
	return data;
};
