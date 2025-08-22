// import { renderHook, waitFor } from '@testing-library/react';

// // Мокаем весь модуль api
// jest.mock('../../../../api', () => ({
// 	axiosInstance: {
// 		get: jest.fn(),
// 	},
// }));

// import { axiosInstance } from '../../../../api';
// import { IOption, useCategories } from './useCategoriese';

// describe('useCategories with mocked instance', () => {
// 	it('should set categories after successful fetch', async () => {
// 		const mockData: IOption[] = [{ id: '1', name: 'Category 1' }];

// 		(axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

// 		const { result } = renderHook(() => useCategories());

// 		await waitFor(() => {
// 			expect(result.current).toEqual(mockData);
// 			expect(axiosInstance.get).toHaveBeenCalledWith('/categories');
// 		});
// 	});
// });
import { act, renderHook, waitFor } from '@testing-library/react';
import { axiosInstance } from '../../../../api';
import { IOption, useCategories } from './useCategoriese';

jest.mock('../../../../api', () => ({
	axiosInstance: {
		get: jest.fn(),
	},
}));

global.structuredClone = jest.fn((val) => {
	return JSON.parse(JSON.stringify(val));
});

describe('useCategories with mocked instance', () => {
	it('should fill categories by id with depth 2 correctly', async () => {
		const mockInitialCategories: IOption[] = [
			{
				id: '1',
				name: 'Образование',
				children: [
					{ id: '2', name: 'Ясли' },
					{
						id: '3',
						name: 'Универ',
					},
				],
			},
			{
				id: '4',
				name: 'Медицина',
				children: [
					{ id: '5', name: 'Поликлиника' },
					{ id: '6', name: 'Анализная' },
				],
			},
		];

		const mockInnerCategories: IOption[] = [
			{ id: '2', name: 'Ясли' },
			{
				id: '3',
				name: 'Универ',
				children: [
					{ id: '7', name: 'МГУ' },
					{ id: '8', name: 'Политех' },
				],
			},
		];

		const resultCategories: IOption[] = [
			{
				id: '1',
				name: 'Образование',
				children: [
					{ id: '2', name: 'Ясли' },
					{
						id: '3',
						name: 'Универ',
						children: [
							{ id: '7', name: 'МГУ' },
							{ id: '8', name: 'Политех' },
						],
					},
				],
			},
			{
				id: '4',
				name: 'Медицина',
				children: [
					{ id: '5', name: 'Поликлиника' },
					{ id: '6', name: 'Анализная' },
				],
			},
		];

		(axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockInitialCategories });
		const { result } = renderHook(() => useCategories());

		await waitFor(() => {
			expect(result.current.categories).toEqual(mockInitialCategories);
		});

		(axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockInnerCategories });
		await act(async () => {
			await result.current.loadCategories('1');
		});
		expect(result.current.categories).toEqual(resultCategories);

		// await waitFor(() => {
		// });
	});
});
