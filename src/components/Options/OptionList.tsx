'use client';
import { useRef, useState, type FC } from 'react';
import clsx from 'clsx';
import { IOption } from '@/widgets/CategoriesModal/api/useCategoriese';
import Arrow from '@/assets/images/arrow.svg';
import { useMobile } from '@/shared/utils/useMobile';

interface IOptionListProps {
	options: IOption[];
	onClick: (index: number) => void;
	selected: number | null;
}
enum Directions {
	Right,
	Left,
}
const OptionList: FC<IOptionListProps> = ({ options, onClick, selected }) => {
	const [offset, setOffset] = useState<number>(0);
	const isMobile = useMobile();
	const optionsRef = useRef<(HTMLDivElement | null)[]>(
		Array.from({ length: options.length }).fill(null) as Array<HTMLDivElement | null>
	);
	const contRef = useRef<HTMLDivElement>(null);
	const handleTranslateClick = (direction: Directions) => {
		if (!contRef.current) return;
		if (direction === Directions.Right) {
			const notFitItem = optionsRef.current.find((item) => {
				if (!item || !contRef.current) return false;
				return item.getBoundingClientRect().right > contRef.current.getBoundingClientRect().right;
			});
			if (!notFitItem) return;
			const dx =
				notFitItem.getBoundingClientRect().right - contRef.current.getBoundingClientRect().right;
			setOffset((offset) => offset - dx);
		} else if (direction === Directions.Left) {
			const notFitItem = optionsRef.current.findLast((item) => {
				if (!item || !contRef.current) return false;
				return item.getBoundingClientRect().left < contRef.current.getBoundingClientRect().left;
			});
			if (!notFitItem) return;
			const dx = contRef.current.getBoundingClientRect().left - notFitItem.getBoundingClientRect().left;
			setOffset((offset) => offset + dx);
		}
	};

	return (
		<div className='max-w-[90%] md:max-w-full flex gap-[20px] w-full h-full  justify-center md:flex-col'>
			{!isMobile && (
				<img
					src={Arrow.src}
					alt=''
					className='w-[20px] rotate-180 cursor-pointer'
					onClick={() => handleTranslateClick(Directions.Left)}
				/>
			)}

			<div className={clsx(' max-w-[90%] md:max-w-full flex-1 h-full  overflow-hidden ')} ref={contRef}>
				<div
					className={clsx('w-full flex gap-1  duration-200 h-full scrollbar-hide', {
						'flex-col overflow-y-auto overflow-x-hidden': isMobile,
						'flex-row': !isMobile,
					})}
					style={{ transform: `translateX(${offset}px)` }}
				>
					{options.map((el, ind) => {
						return (
							<div
								ref={(el) => {
									optionsRef.current[ind] = el;
								}}
								key={el.id}
								onClick={() => onClick(ind)}
								className={clsx(
									'whitespace-nowrap md:whitespace-normal leading-[24px] cursor-pointer flex items-center justify-center text-center  border-2  font-semibold duration-200 text-[20px] p-[15px] select-none rounded-[10px] bg-white hover:border-amber-600',
									{ 'border-amber-600': selected !== null && ind === selected },
									{ 'border-black': !(selected !== null && ind === selected) }
								)}
							>
								{el.name}
							</div>
						);
					})}
				</div>
			</div>
			{!isMobile && (
				<img
					src={Arrow.src}
					alt=''
					className='w-[20px] cursor-pointer'
					onClick={() => handleTranslateClick(Directions.Right)}
				/>
			)}
		</div>
	);
};

export default OptionList;
