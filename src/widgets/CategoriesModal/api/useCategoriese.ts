import axios from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { axiosInstance } from '../../../../api';
import { useCategoriesStore } from '@/store/store';

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
	const [categories, setCategories] = useState<IOption[]>();
	const loadedNodes = useRef<Set<string>>(new Set());

	const loadCategories = useCallback(
		async (parentCategoryId?: string) => {
			if (parentCategoryId && loadedNodes.current.has(parentCategoryId)) return;

			try {
				const { data: newCategories } = await axiosInstance.get<IOption[]>(
					`/categories/${parentCategoryId ?? ''}?depth=${Depth}`
				);
				setCategories((prev) => {
					if (parentCategoryId && prev) {
						const prevCopy = structuredClone(prev);
						fillCategoryById(parentCategoryId, prevCopy, newCategories);
						return prevCopy;
					} else {
						return newCategories;
					}
				});
				if (parentCategoryId) {
					loadedNodes.current.add(parentCategoryId);
				}
			} catch (err) {
				console.log(err);
			}
		},
		[setCategories]
	);

	const { currentCategory, setCurrentCategory, selectedPath, setSelectedPath } = useCategoriesStore();

	useEffect(() => {
		const localCategoryStr = localStorage.getItem('currentCategory');
		const currentCategory = localCategoryStr ? (JSON.parse(localCategoryStr) as IOption) : undefined;

		const fetch = async () => {
			if (!currentCategory) return;
			try {
				const { data: rootCategory } = await axiosInstance.get<IOption>(
					`categories/buildPathTo/${currentCategory.id}`
				);
				console.log(rootCategory);
			} catch (err) {}
			// 1. update current category
			// 2. ipdate categories
			// 3. build path by rootCategory
		};

		if (currentCategory) {
			fetch();
		}
	}, []);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	return { categories: categories ?? [], loadCategories };
};
