import { axiosInstance } from '../../../../api';

export interface getSophStatsResponse {
	data: Array<{
		date: string;
		answers: Record<string, Record<string, number>>;
	}>;
}
export const getSophStats = async (
	pollId: string,
	daysBefore: number
): Promise<getSophStatsResponse> => {
	const { data } = await axiosInstance.get<getSophStatsResponse>(`/polls/${pollId}/dailyStat`, {
		params: {
			daysBefore,
		},
	});
	return data;
};
