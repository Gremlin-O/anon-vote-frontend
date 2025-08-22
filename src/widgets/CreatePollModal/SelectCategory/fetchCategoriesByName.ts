import { axiosInstance } from '../../../../api';

export interface ICategory {
	name: string;
	id: string;
}

export const fetchCategoriesByName = async () => {
	try {
		const { data: partialCategories } = await axiosInstance.get<ICategory[]>(`/categories/#`);
		return partialCategories;
	} catch (err) {
		console.log(err);
	}
};
