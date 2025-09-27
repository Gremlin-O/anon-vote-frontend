import Button from '@/components/Button/Button'
import clsx from 'clsx'
import React, { FC } from 'react'

interface INavButtonProps {
    text: string
    isCollapsed: boolean
    isMobile: boolean
    onClick: ()=> void
    src: string
    className?: string
}


const NavButton:FC<INavButtonProps> = ({text, isCollapsed, isMobile, onClick, src, className}) => {
  return (
    				<Button
					text=''
					className={clsx('border-3! flex justify-center duration-100',className, {
						'w-[50px]': isCollapsed && !isMobile,
						'w-[80%]': !isCollapsed,
						'opacity-0': isCollapsed && isMobile,
					})}
					onClick={()=>onClick()}
				>
					{isCollapsed ? <img src={src} className='w-[20px]' /> : text}
				</Button>
)
}

export default NavButton