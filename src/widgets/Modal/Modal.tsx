'use client';
import Close from '@/assets/close.svg';
import clsx from 'clsx';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

interface IModalProps {
	show: boolean;
	children?: ReactNode;
	className?: string;
	onClose?: () => void;
}

const ExitTimer = 0.2;

const Modal: FC<IModalProps> = ({ children, className, show, onClose }) => {
	const [isClient, setIsClient] = useState(false);
	const bgScrollTop = useRef<number>(typeof document !== 'undefined' ? document.body.scrollTop : 0);

	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden';
			bgScrollTop.current = document.body.scrollTop;
		} else {
			document.body.style.overflow = 'auto';
			document.body.scrollTop = bgScrollTop.current;
		}
	}, [show]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return typeof document === 'undefined' || !isClient
		? null
		: createPortal(
				<AnimatePresence>
					{show && (
						<>
							<motion.div
								onClick={onClose}
								key={1}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.25 }}
								className='bg-black/40 backdrop-blur-[2px] w-[100vw] h-[100vh] fixed left-0 top-0 z-20'
								exit={{ opacity: 0, transition: { duration: ExitTimer } }}
							></motion.div>
							<motion.div
								key={2}
								initial={{ opacity: 0, scale: 0.95, y: 8 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.97, transition: { duration: ExitTimer } }}
								transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
								className={twMerge(
									'fixed left-[50%] top-[50%] translate-[-50%] w-[70%] h-[90%] glass border border-[#d4c4cf] border-t-4 border-t-[#ffce78] rounded-2xl shadow-modal md:flex md:w-[85%] z-20 overflow-hidden',
									clsx({}),
									className
								)}
							>
								<img
									src={Close.src}
									className='absolute top-[16px] right-[16px] w-[32px] opacity-60 cursor-pointer duration-200 hover:opacity-100 hover:scale-110 md:w-[28px] md:top-[12px] md:right-[12px] z-10'
									onClick={onClose}
								/>
								{children}
							</motion.div>
						</>
					)}
				</AnimatePresence>,
				document.getElementById('modals')!
			);
};

export default Modal;
