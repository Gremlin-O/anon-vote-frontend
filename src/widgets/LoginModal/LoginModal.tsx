'use client'
import React, { FC, useState } from 'react'
import Modal from '../Modal/Modal'
import Button from '@/components/Button/Button'

interface ILoginModalProps {
    show: boolean
    onClose: () => void
}


const LoginModal:FC<ILoginModalProps> = ({show, onClose}) => {

    const [mail, setMail] = useState<string>('')

    const handleLoginClick = () => {
        
    }

  return (
    <Modal show={show} className='w-[30%] h-[50%] lg:w-[60%]' onClose={onClose}>

    <div className='p-[20px] w-fit'>
					<h1 className='text-[32px] mb-[40px] text-primary md:text-[28px]'>Вход</h1>

        <input
					value={mail}
					onChange={(e) => setMail(e.currentTarget.value)}
					type='text'
					placeholder='Введите вашу почту'
					className='min-w-[300px] border-medium bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0 flex-1 mb-[20px] md:w-full md:min-w-0'/>
                    <Button text='Выслать код' className='w-[60%] md:w-full'/>
    </div>


    </Modal>
  )
}

export default LoginModal