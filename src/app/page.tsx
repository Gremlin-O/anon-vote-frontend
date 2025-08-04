'use client';
import Polls from '@/components/Polls/Polls';
import { useMobile } from '@/shared/utils/useMobile';
import clsx from 'clsx';

export default function Home() {
	const isMobile = useMobile();
	return (
		<div
			className={clsx('ml-[150px] pt-[50px] xl:ml-[100px]', {
				'ml-[40px]!': isMobile,
			})}
		>
			<Polls></Polls>
		</div>
	);
}
