import React, { FC } from 'react';
import SearchImg from '@/assets/images/search.svg';

interface ISearchProps {
	onChangeValue: (value: string) => void;
	value: string;
}

const Search: FC<ISearchProps> = ({ onChangeValue, value }) => {
	return (
		<div>
			<div className='bg-white border rounded-[10px] w-[90%] mx-auto p-[10px] cursor-pointer flex gap-[10px]'>
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
