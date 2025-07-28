import type { FC } from 'react';
import clsx from 'clsx';
import { IOption } from '@/widgets/CategoriesModal/CategoriesModal';

interface IOptionListProps {
	options: IOption[];
	onClick: (index: number) => void;
	selected: number | null;
}

const OptionList: FC<IOptionListProps> = ({ options, onClick, selected }) => {
	return (
		<div className='cursor-pointer w-auto flex gap-1 h-[90%]'>
			{options.map((el, ind) => {
				return (
					<div
						key={el.id}
						onClick={() => onClick(ind)}
						className={clsx(
							'text-center border border-2 border-black font-semibold duration-100 text-[25px] p-[15px] select-none rounded-[10px] bg-white hover:border-zinc-500',
							{ 'border-gray-400': selected !== null && ind === selected }
						)}
					>
						{el.name}
					</div>
				);
			})}
		</div>
	);
};

export default OptionList;
