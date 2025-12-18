'use client';
import { IStat } from '@/components/Stat/Stat';
import { useAuthStore } from '@/store/authStore';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { fetchBasicStats } from '../api/fetchStats';
import { IQuery } from '../api/models';
import { sendAnswers } from '../api/sendAnswers';
import PollContent from './PollContent';
import PollFooter from './PollFooter';
import PollHeader from './PollHeader';

interface IPollProps {
  id: string;
  title: string;
  tags: string[];
  queries: IQuery[];
  className?: string;
  backIsAnswered: boolean;
}

// interface IPollAnswer extends IAnswer {
// 	isChosen: boolean;
// }

const Poll: FC<IPollProps> = ({ title, tags, queries, id, className, backIsAnswered }) => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const [statError, setStatError] = useState<string>();
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();
  const [pollStat, setPollStat] = useState<IStat>();
  const [selectedResponses, setSelectedResponses] = useState<Record<string, string>>({});
  const { isAuthed } = useAuthStore();
  const isDisabled = !isAuthed || isAnswered || backIsAnswered;
  const shouldShowStats = isAuthed && (isAnswered || backIsAnswered);

  const handleToggleStat = async () => {
    if (isAnswered || backIsAnswered) {
      try {
        const stats = await fetchBasicStats(id);
        setShowStats(prev => !prev);
        setPollStat(stats);
      } catch (error) {
        setStatError(error instanceof Error ? error.message : String(error));
      }
    }
  };

  const handleSubmitClick = async () => {
    if (isDisabled) return;
    if (Object.keys(selectedResponses).length < queries.length) {
      setErrorText('Даны не все ответы!))');
      return;
    }
    try {
      await sendAnswers(id, selectedResponses);
      setIsAnswered(true);
      setErrorText('');
    } catch (error) {}
  };

  return (
    <div className={clsx('border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary', className)}>
      <PollHeader title={title} tags={tags} id={id} />
      <PollContent
        showStats={showStats}
        pollStat={pollStat}
        queries={queries}
        isDisabled={isDisabled}
        onClick={answer => {
          setSelectedResponses(answer);
        }}
        selectedResponses={selectedResponses}
      />
      {statError != '' && (
        <div>
          <p className='text-[20px] mt-[15px] text-red-500 mt-[7px] -mb-[10px]'>{statError}</p>
        </div>
      )}
      {errorText != '' && (
        <div>
          <p className='text-[20px] text-red-500 mt-[7px] -mb-[10px]'>{errorText}</p>
        </div>
      )}
      <PollFooter
        onClick={() => handleSubmitClick()}
        isDisabled={isDisabled}
        canToggleStats={shouldShowStats}
        toggleStats={handleToggleStat}
      />
    </div>
  );
};

export default Poll;
