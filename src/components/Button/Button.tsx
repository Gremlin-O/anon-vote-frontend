import React, { ReactNode, type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface IButtonProps {
	text: string;
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ text, className, children, onClick }) => {
	return (
		<div
			className={twMerge(
				'font-[20px] text-center font-semibold border-2 bg-white p-[10px] cursor-pointer rounded-[20px] select-none duration-100 hover:border-zinc-500',
				className
			)}
			onClick={() => onClick?.()}
		>
			{text}
			{children}
		</div>
	);
};

export default Button;
