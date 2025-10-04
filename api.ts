import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	paramsSerializer: {
		serialize: (params) => {
			return qs.stringify(params, { arrayFormat: 'repeat' }); // or 'indices', 'brackets'
		},
	},
});
