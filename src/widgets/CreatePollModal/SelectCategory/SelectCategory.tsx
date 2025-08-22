import React, { useEffect, useRef, useState } from 'react';
import { fetchCategoriesByName, ICategory } from './fetchCategoriesByName';
import clsx from 'clsx';
const SelectCategory = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [currentCategories, setCurrentCategories] = useState<ICategory[]>([
		{ name: 'Test', id: '1' },
		{ name: 'Test1', id: '2' },
	]);
	useEffect(() => {
		const callback = () => {
			setIsOpen(false);
		};
		if (typeof window !== 'undefined') {
			window.addEventListener('click', callback);
		}

		return () => {
			window.removeEventListener('click', callback);
		};
	}, [setIsOpen]);
	// useEffect(() => {
	// 	if (timeoutRef.current) {
	// 		clearTimeout(timeoutRef.current);
	// 	}
	// 	timeoutRef.current = setTimeout(async () => {
	// 		const data = await fetchCategoriesByName();
	// 		setCurrentCategories(data);
	// 	}, 300);
	// }, [inputValue]);

	return (
		<div className=' mb-[20px] w-full relative' onClick={(e) => e.stopPropagation()}>
			<input
				onFocus={() => setIsOpen(true)}
				// onBlur={() => setIsOpen(false)}
				value={inputValue}
				onChange={(e) => setInputValue(e.currentTarget.value)}
				type='text'
				placeholder='Введите категорию опроса'
				className={clsx('border rounded-[5px] p-[8px] text-[16px] outline-0 w-full duration-100', {
					'rounded-b-none': isOpen,
					'rounded-b-[5px]': !isOpen,
				})}
			/>
			{isOpen && (
				<div className='absolute left-0 w-full flex flex-col max-h-[100px] bg-white border rounded-[5px] rounded-t-none border-t-0'>
					{currentCategories?.map((category, categoryInd) => {
						return (
							<div
								key={category.id}
								className='p-[5px] cursor-pointer duration-100 hover:bg-gray-100'
								onClick={() => {
									setInputValue(category.name);
									setIsOpen(false);
								}}
							>
								{category.name}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SelectCategory;
