'use client';
import Button from '@/components/Button/Button';
import Profile from '@/assets/images/profile.svg';
import Plus from '@/assets/images/plus.svg';
import List from '@/assets/images/list.svg';
import Arrow from '@/assets/images/arrow.svg';
import Menu from '@/assets/images/menu.svg';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import { useModal } from '../Modal/useModal';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMobile } from '@/shared/utils/useMobile';
import CreatePollModal from '../CreatePollModal/CreatePollModal';

const Navbar = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const categoriesModal = useModal('categories-modal');
	const createPollModal = useModal('create-poll-modal');

	const isMobile = useMobile();
	return (
		<>
			{isMobile && isCollapsed && (
				<img
					src={Menu.src}
					className='fixed top-0 left-0 w-[40px] cursor-pointer duration-100 hover:scale-[1.05]'
					onClick={() => setIsCollapsed(false)}
				></img>
			)}

			<div
				className={clsx(
					'bg-amber-50 border-r fixed left-0 h-[100%] flex flex-col  items-center duration-200',
					{
						'w-[80px] gap-[20px]': isCollapsed && !isMobile,
						'w-[200px]  gap-[50px]': !isCollapsed,
						'w-[120px]!  gap-[30px]!': isMobile && !isCollapsed,
						'w-[0px]': isMobile && isCollapsed,
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
					className={clsx('flex justify-center mt-[70px] duration-100', {
						'w-[50px]': isCollapsed && !isMobile,
						'w-[100px]': !isCollapsed,
						'opacity-0': isCollapsed && isMobile,
					})}
					onClick={categoriesModal.toggle}
				>
					{isCollapsed ? <img src={List.src} className='w-[20px]' /> : 'Категории опросов'}
				</Button>
				<Button
					text=''
					className={clsx('flex justify-center duration-100', {
						'w-[50px]': isCollapsed && !isMobile,
						'w-[100px]': !isCollapsed,
						'opacity-0': isCollapsed && isMobile,
					})}
					onClick={() => createPollModal.show()}
				>
					{isCollapsed ? <img src={Plus.src} className='w-[20px]' /> : 'Создать опрос'}
				</Button>
				<Button
					text=''
					className={clsx('flex justify-center duration-100', {
						'w-[50px]': isCollapsed && !isMobile,
						'w-[100px]': !isCollapsed,
						'opacity-0': isCollapsed && isMobile,
					})}
				>
					<img
						src={Profile.src}
						className={clsx('', {
							'w-[20px]': isCollapsed && !isMobile,
							'w-[50px]': !isCollapsed && !isMobile,
							'w-[35px]': isMobile,
						})}
					/>
				</Button>
				<CategoriesModal show={categoriesModal.isShown} onClose={categoriesModal.hide} />
				<CreatePollModal show={createPollModal.isShown} onClose={createPollModal.hide} />
			</div>
		</>
	);
};

export default Navbar;
