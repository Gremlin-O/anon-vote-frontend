'use client';
import Polls from '@/components/Polls/Polls';
import { useMobile } from '@/shared/utils/useMobile';
import clsx from 'clsx';

export default function Home() {
	const isMobile = useMobile();
	return (
		<div
			className={clsx(' max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px]', {
				'ml-[40px]!': isMobile,
			})}
		>
			<Polls></Polls>
		</div>
	);
}
