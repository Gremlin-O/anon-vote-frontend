import axios from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api';

export interface IOption {
	name: string;
	children?: IOption[];
	id: string;
}

export const useCategories = () => {
	const [categories, setCategories] = useState<IOption[]>();

	useEffect(() => {
		const fn = async () => {
			try {
				const res = await axiosInstance.get<IOption[]>('/categories');

				setCategories(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		fn();
	}, []);

	return categories;
};
