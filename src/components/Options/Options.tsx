'use client';
import { FC, useState } from 'react';
// import Option from './OptionList';
import OptionList from './OptionList';
import { IOption } from '@/widgets/CategoriesModal/api/useCategoriese';

interface IOptionsProps {
	options: IOption[];
	path: number[];
	onChange: (path: number[]) => void;
}

// const getMaxDepth = (options: IOption[]): number => {
// 	const getMaxDepthRec = (option: IOption): number => {
// 		if (!option.children) return 1;
// 		return Math.max(...option.children.map((ch) => getMaxDepthRec(ch))) + 1;
// 	};

// 	return Math.max(...options.map((opt) => getMaxDepthRec(opt)));
// };

const Options: FC<IOptionsProps> = ({ options, path, onChange }) => {
	const selectOption = (listInd: number, ind: number) => {
		if (path.length - 1 > listInd && path[listInd + 1] === ind) {
			onChange(path.slice(0, listInd + 1));
		} else {
			onChange(path.slice(0, listInd + 1).concat([ind]));
		}
	};
	let option = options;
	return (
		<div className='flex gap-[10px] flex-col items-center mt-[30px]'>
			<OptionList options={options} onClick={(ind) => selectOption(0, ind)} selected={path[1] ?? null} />
			{path.slice(1).map((pathEl, listInd) => {
				if (!option?.[pathEl]?.children) return;
				option = option[pathEl].children;
				return (
					<OptionList
						selected={path[listInd + 2] ?? null}
						key={path.slice(0, listInd + 2).toString()}
						options={option}
						onClick={(ind) => selectOption(listInd + 1, ind)}
					/>
				);
			})}
		</div>
	);
};

export default Options;
