import Button from '@/components/Button/Button';
import clsx from 'clsx';
import React, { FC } from 'react';
import statistics from '@/assets/images/statistics.svg';
import sophisticatedStatistics from '@/assets/images/sophisticated-statistics.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IPollFooterProps {
	onClick: () => void;
	isDisabled: boolean;
	toggleStats: () => void;
	canToggleStats: boolean;
	id: string;
}

const PollFooter: FC<IPollFooterProps> = ({ onClick, id, isDisabled, toggleStats, canToggleStats }) => {
	const router = useRouter();
	return (
		<div className='flex justify-between items-center mt-[20px] '>
			<Button
				onClick={() => onClick()}
				text='Сохранить ответы'
				className={clsx('w-fit text-primary', {
					inactive: isDisabled,
				})}
			/>
			<div className='flex gap-[15px]'>
				{canToggleStats && (
					<img
						src={statistics.src}
						alt=''
						className='w-[50px] cursor-pointer duration-100 hover:scale-[1.1]'
						onClick={() => toggleStats()}
					/>
				)}
				{canToggleStats && (
					<img
						src={sophisticatedStatistics.src}
						alt=''
						className='w-[40px] cursor-pointer duration-100 hover:scale-[1.1]'
						onClick={() => router.push(`/sophisticatedStats/${id}`)}
					/>
				)}
			</div>
		</div>
	);
};

export default PollFooter;
