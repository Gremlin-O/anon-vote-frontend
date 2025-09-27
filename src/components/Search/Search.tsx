import React, { FC } from 'react';
import SearchImg from '@/assets/images/search.svg';
import clsx from 'clsx';

interface ISearchProps {
	onChangeValue: (value: string) => void;
	value: string;
	className?: string;
}

const Search: FC<ISearchProps> = ({ onChangeValue, value, className }) => {
	return (
		<div>
			<div
				className={clsx(
					'bg-white border-bold rounded-[10px] w-[90%] mx-auto p-[10px] cursor-pointer flex gap-[10px] 2xl:w-[80%] lg:ml-[20px] lg:mr-0',
					className
				)}
			>
				<img src={SearchImg.src} className='w-[35px]' />
				<input
					value={value}
					type='text'
					className='outline-none text-[25px] w-full'
					onChange={(e) => onChangeValue(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Search;
