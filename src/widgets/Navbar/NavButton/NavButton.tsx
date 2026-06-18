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
      className={clsx('btn-nav flex justify-center items-center duration-200 rounded-lg', className, {
        'w-[44px] h-[44px] p-0!': isCollapsed && !isMobile,
        'w-[80%] px-3! py-2!': !isCollapsed,
        'opacity-0': isCollapsed && isMobile,
      })}
      onClick={()=>onClick()}
    >
      {isCollapsed ? <img src={src} className='w-[22px]' alt='' /> : text}
    </Button>
  )
}

export default NavButton
