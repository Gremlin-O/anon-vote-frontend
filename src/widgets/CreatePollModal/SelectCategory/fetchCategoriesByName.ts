import { axiosInstance } from '../../../../api';

export interface ICategory {
	name: string;
	path: string[];
	id: string;
}

export const fetchCategoriesByName = async (name: string) => {
	try {
		const { data: partialCategories } = await axiosInstance.get<ICategory[]>(`/categories/search?name=${name}`);
		return partialCategories;
	} catch (err) {
		return []
		console.log(err);
	}
};
