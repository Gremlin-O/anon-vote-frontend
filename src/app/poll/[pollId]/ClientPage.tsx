'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchPoll } from '../api/fetchPoll';
import Poll from '@/components/Polls/Poll/Poll';
import clsx from 'clsx';
import { IPoll } from '@/components/Polls/api/models';

export const ClientPage = () => {
  const params = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<IPoll>();
  useEffect(() => {
    fetchPoll(params.pollId).then(poll => {
      setPoll(poll);
    });
  }, [setPoll, params.pollId]);

  return (
    <div className={clsx(' max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]!')}>
      <h1 className='text-primary text-[40px] mb-[20px] font-bold'>Опрос</h1>
      {poll !== undefined ? (
        <Poll id={poll?.id} title={poll?.title} tags={poll.tags} queries={poll.queries} backIsAnswered={poll.isAnswered}></Poll>
      ) : (
        <></>
      )}
    </div>
  );
};
