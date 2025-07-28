'use client';
import Button from '@/components/Button/Button';
import Profile from '@/assets/images/profile.svg';
import Plus from '@/assets/images/plus.svg';
import List from '@/assets/images/list.svg';
import Arrow from '@/assets/images/arrow.svg';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import { useModal } from '../Modal/useModal';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Navbar = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const categoriesModal = useModal('categories-modal');

	return (
		<div
			className={clsx(
				'bg-amber-50 border-r fixed left-0 h-[100%] flex flex-col  items-center duration-200',
				{
					'w-[80px] gap-[20px]': isCollapsed,
					'w-[200px]  gap-[50px]': !isCollapsed,
				}
			)}
		>
			<img
				src={Arrow.src}
				className={clsx(
					'absolute  top-[10px] w-[40px] scale-75 scale-y-[70%] cursor-pointer duration-400',
					{
						'rotate-[180deg] scale-100 scale-y-[90%] right-[10px]': !isCollapsed,
						'left-[50%] translate-x-[-50%]': isCollapsed,
					}
				)}
				onClick={() => setIsCollapsed(!isCollapsed)}
			/>
			<Button
				text=''
				className={clsx('flex justify-center mt-[70px]', {
					'w-[50px]': isCollapsed,
					'w-[100px]': !isCollapsed,
				})}
				onClick={categoriesModal.toggle}
			>
				{isCollapsed ? <img src={List.src} className='w-[20px]' /> : 'Категории опросов'}
			</Button>
			<Button
				text=''
				className={clsx('flex justify-center ', { 'w-[50px]': isCollapsed, 'w-[100px]': !isCollapsed })}
			>
				{isCollapsed ? <img src={Plus.src} className='w-[20px]' /> : 'Создать опрос'}
			</Button>
			<Button
				text=''
				className={clsx('flex justify-center ', { 'w-[50px]': isCollapsed, 'w-[100px]': !isCollapsed })}
			>
				<img
					src={Profile.src}
					className={clsx('', { 'w-[20px]': isCollapsed, 'w-[50px]': !isCollapsed })}
				/>
			</Button>
			<CategoriesModal show={categoriesModal.isShown} onClose={categoriesModal.hide} />
		</div>
	);
};

export default Navbar;
