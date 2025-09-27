import { useCallback } from 'react';
import { axiosInstance } from '../../../api';

export const fetloginchMail = (email: string) => {
			return axiosInstance.post(`/auth/login`, {
				email: email
			});
		}
	