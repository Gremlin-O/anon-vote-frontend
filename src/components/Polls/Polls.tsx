'use client';
import React, { useState } from 'react';
import { IPoll, usePolls } from './api/usePolls';
import Poll from './Poll/Poll';

const polls: IPoll[] = [
	{
		title: 'Тест',
		queries: [
			{
				id: '123',
				text: 'Почему?',
				answers: [
					{ response: 'Тест1', isChosen: false, id: '0' },
					{ response: 'Тест2', isChosen: true, id: '0' },
				],
			},
			{
				id: '123',
				text: 'Сколько?',
				answers: [
					{ response: 'Тест1', isChosen: false, id: '0' },
					{ response: 'Тест2', isChosen: true, id: '0' },
				],
			},
		],
		id: '1',
		tags: ['Тренды', 'Философия'],
	},
	{
		title: 'Тест',
		queries: [
			{
				id: '123',
				text: 'Почему?',
				answers: [
					{ response: 'Тест1', isChosen: false, id: '0' },
					{ response: 'Тест2', isChosen: true, id: '0' },
				],
			},
			{
				id: '123',
				text: 'Сколько?',
				answers: [
					{ response: 'Тест1', isChosen: false, id: '0' },
					{ response: 'Тест2', isChosen: true, id: '0' },
				],
			},
		],
		id: '2',
		tags: ['Тренды', 'Философия'],
	},
];

polls.forEach((poll, i1) => {
	poll.queries.forEach((q, i2) => {
		q.id = i1.toString() + i2.toString();
		q.answers.forEach((ans, i3) => (ans.id = Date.now() + '-' + ans.response));
	});
	poll.id = i1.toString();
});

const Polls = () => {
	// const polls = usePolls();

	const answers = useState<Record<string, { response: string; isChosen: boolean }[]>[]>();

	const handleSubmitClick = () => {};

	return (
		<div className='flex flex-col gap-[20px]'>
			{polls?.map((poll) => {
				return (
					<Poll
						id={poll.id}
						onSubmit={handleSubmitClick}
						key={poll.id}
						title={poll.title}
						tags={poll.tags}
						queries={poll.queries}
					></Poll>
				);
			})}
		</div>
	);
};

export default Polls;
