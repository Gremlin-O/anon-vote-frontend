import React, { ReactNode, type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '@/assets/images/close.svg';

interface ICloseButtonProps {
	className?: string;
	onClick?: () => void;
}

const CloseButton: FC<ICloseButtonProps> = ({ className, onClick }) => {
	return (
		<div className={twMerge('cursor-pointer w-[20px]', className)} onClick={() => onClick?.()}>
			<img src={Close.src} alt='' />
		</div>
	);
};

export default CloseButton;
