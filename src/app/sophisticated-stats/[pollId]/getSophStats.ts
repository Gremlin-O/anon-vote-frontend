import { axiosInstance } from '../../../../api';

export interface GetSophStatsResponse {
	data: Array<{
		date: string;
		answers: Record<string, Record<string, number>>;
	}>;
}
export const getSophStats = async (
	pollId: string,
	daysBefore: number
): Promise<GetSophStatsResponse> => {
	const { data } = await axiosInstance.get<GetSophStatsResponse>(`/polls/${pollId}/dailyStat`, {
		params: {
			daysBefore,
		},
	});
	return data;
};
