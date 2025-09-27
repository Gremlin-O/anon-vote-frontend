'use client';
import Button from '@/components/Button/Button';
import Profile from '@/assets/images/profile.svg';
import Plus from '@/assets/images/plus.svg';
import List from '@/assets/images/list.svg';
import Arrow from '@/assets/images/arrow.svg';
import Menu from '@/assets/images/menu.svg';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useModal } from '../Modal/useModal';
import CategoriesModal from '../CategoriesModal/CategoriesModal';
import { useMobile } from '@/shared/utils/useMobile';
import CreatePollModal from '../CreatePollModal/CreatePollModal';
import NavButton from './NavButton/NavButton';
import LoginModal from '../LoginModal/LoginModal';

const Navbar = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const categoriesModal = useModal('categories-modal');
	const createPollModal = useModal('create-poll-modal');
	const createLoginModal = useModal('create-login-modal');


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
					'bg-light border-[#7b1258] fixed left-0 h-[100%] flex flex-col  items-center duration-200',
					{
						'w-[80px] gap-[20px]  border-r-4': isCollapsed && !isMobile,
						'w-[180px]  gap-[20px]  border-r-4': !isCollapsed && !isMobile,
						'w-[120px]!  gap-[30px]!  border-r-4': isMobile && !isCollapsed,
						'w-[0px] border-0': isMobile && isCollapsed,
					}
				)}
			>
				<img
					src={Arrow.src}
					className={clsx(
						'absolute top-[10px] w-[40px] scale-75 scale-y-[70%] cursor-pointer duration-400',
						{
							'rotate-[180deg] scale-100 scale-y-[90%] right-[10px]': !isCollapsed,
							'left-[50%] translate-x-[-50%]': isCollapsed,
						}
					)}
					onClick={() => setIsCollapsed(!isCollapsed)}
				/>
				<NavButton text='Категории опросов' src={List.src} isCollapsed={isCollapsed} isMobile={isMobile} onClick={categoriesModal.toggle} className='mt-[70px]'/>
				<NavButton text='Создать опрос' src={Plus.src} isCollapsed={isCollapsed} isMobile={isMobile} onClick={createPollModal.show}/>
				<NavButton text='Профиль' src={Profile.src} isCollapsed={isCollapsed} isMobile={isMobile} onClick={createPollModal.show}/>

	
				<CategoriesModal show={categoriesModal.isShown} onClose={categoriesModal.hide} />
				<CreatePollModal show={createPollModal.isShown} onClose={createPollModal.hide} />
				<LoginModal show={false} onClose={createLoginModal.hide}/>
			</div>
		</>
	);
};

export default Navbar;
