'use client';
import Button from '@/components/Button/Button';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { IAnswer, IQuery, usePolls } from '../api/usePolls';
import { axiosInstance } from '../../../../api';
import { useSubmitPoll } from '../api/useSubmitPoll';

interface IPollProps {
	id: string;
	title: string;
	tags: string[];
	queries: IQuery[];
	onSubmit: (responses: Record<string, string>) => void;
}

// interface IPollAnswer extends IAnswer {
// 	isChosen: boolean;
// }

const Poll: FC<IPollProps> = ({ title, tags, queries, onSubmit, id }) => {
	const [selectedResponses, setSelectedResponses] = useState<Record<string, IAnswer>>({});
	const { submitPoll } = useSubmitPoll(id);

	const handleSubmit = async () => {
		await submitPoll(selectedResponses);
	};

	return (
		<div className='border rounded-[20px] p-[20px] w-[800px] bg-amber-50'>
			<div className='flex justify-between border-b items-center'>
				<h1 className='text-[40px]'>{title}</h1>
				<div className='flex flex-wrap gap-[10px]'>
					{tags.map((tag, tagInd) => {
						return (
							<p
								key={tagInd}
								className='text-orange-400 text-shadow-amber-200 font-semibold text-shadow-[2px_2px_3px]'
							>
								#{tag}
							</p>
						);
					})}
				</div>
			</div>
			<div>
				<div className='flex flex-col gap-[20px] mt-[20px]'>
					{queries.map((query, queryInd) => {
						return (
							<div key={queryInd} className='border rounded-[10px] p-[10px] bg-white'>
								<h1 className='text-[24px]'>{query.text}</h1>
								{query.answers.map((answer, answerInd) => {
									return (
										<div
											key={answerInd}
											className='group flex gap-[5px] items-center w-full cursor-pointer'
											onClick={() =>
												setSelectedResponses((selectedResponses) => ({
													...selectedResponses,
													[query.id]: answer,
												}))
											}
										>
											<div
												className={clsx(
													'group-hover:bg-black duration-150 w-[10px] h-[10px] rounded-[50%] border-2',
													{
														'bg-black': selectedResponses[query.id]?.id === answer.id,
														'bg-transparent': selectedResponses[query.id]?.id !== answer.id,
													}
												)}
											></div>
											<p className='text-[20px]'>{answer.response}</p>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<Button onClick={handleSubmit} text='Сохранить ответы' className={clsx('mt-[20px] w-fit', {})} />
		</div>
	);
};

export default Poll;
