import Button from '@/components/Button/Button';
import clsx from 'clsx';
import React, { FC } from 'react';
import statistics from '@/assets/images/statistics.svg';

interface IPollFooterProps {
  onClick: () => void;
  isDisabled: boolean;
  toggleStats: () => void;
  canToggleStats: boolean;
}

const PollFooter: FC<IPollFooterProps> = ({ onClick, isDisabled, toggleStats, canToggleStats }) => {
  return (
    <div className='flex justify-between items-center mt-[20px] '>
      <Button
        onClick={() => onClick()}
        text='Сохранить ответы'
        className={clsx('w-fit text-primary', {
          inactive: isDisabled,
        })}
      />
      {canToggleStats && <img src={statistics.src} alt='' className='w-[50px] cursor-pointer' onClick={() => toggleStats()} />}
    </div>
  );
};

export default PollFooter;
