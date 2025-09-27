import { IOption } from '@/widgets/CategoriesModal/api/useCategoriese';
import { create } from 'zustand';

interface ICategories {
	currentCategory?: IOption;
	selectedPath: number[];
	setCurrentCategory: (el: IOption) => void;
	setSelectedPath: (el: number[]) => void;
}

export const useCategoriesStore = create<ICategories>()((set) => ({
	currentCategory: undefined,
	selectedPath: [0],
	setCurrentCategory: (el) => set(() => ({ currentCategory: el })),
	setSelectedPath: (el) => set(() => ({ selectedPath: el })),
}));
