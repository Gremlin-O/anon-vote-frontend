import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api';

export interface IOption {
	name: string;
	children?: IOption[];
	id: string;
}

const Depth = 2;

const fillCategoryById = (id: string, options: IOption[], fillCategories: IOption[]) => {
	const fn = (option: IOption): IOption | undefined => {
		if (option.id === id) {
			return option;
		} else {
			return option.children?.map(fn).filter(Boolean)[0];
		}
	};

	const foundCategory = options.map(fn).filter(Boolean)[0];
	if (foundCategory) {
		foundCategory.children = fillCategories;
	}
};

export const useCategories = () => {
	const [categories, setCategories] = useState<IOption[]>([]);

	const loadCategories = useCallback(
		async (parentCategoryId?: string) => {
			try {
				const { data: newCategories } = await axiosInstance.get<IOption[]>(
					`/categories/${parentCategoryId ?? ''}?depth=${Depth}`
				);
				setCategories((prev) => {
					if (parentCategoryId) {
						const prevCopy = structuredClone(prev);
						fillCategoryById(parentCategoryId, prevCopy, newCategories);
						return prevCopy;
					} else {
						return newCategories;
					}
				});
			} catch (err) {
				console.log(err);
			}
		},
		[setCategories]
	);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	return { categories, loadCategories };
};
