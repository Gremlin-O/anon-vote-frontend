import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api';

export interface IAnswer {
	id: string;
	response: string;
}

export interface IQuery {
	id: string;
	text: string;
	answers: IAnswer[];
}

export interface IPoll {
	title: string;
	queries: IQuery[];
	id: string;
	tags: string[];
}

export const usePolls = () => {
	const [polls, setPolls] = useState<IPoll[]>();

	useEffect(() => {
		const fn = async () => {
			try {
				const res = await axiosInstance.get<IPoll[]>('/polls');

				setPolls(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		fn();
	}, []);

	return polls;
};
