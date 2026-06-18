'use client';
import { IStat } from '@/components/Stat/Stat';
import { useAuthStore } from '@/store/authStore';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { fetchBasicStats } from '../api/fetchStats';
import { IQuery, IPollCategory } from '../api/models';
import { sendAnswers } from '../api/sendAnswers';
import PollContent from './PollContent';
import PollFooter from './PollFooter';
import PollHeader from './PollHeader';

interface IPollProps {
	id: string;
	title: string;
	tags: string[];
	category?: IPollCategory;
	queries: IQuery[];
	className?: string;
	backIsAnswered: boolean;
	votes: number;
	onVotesChange?: (votes: number) => void;
}

const Poll: FC<IPollProps> = ({ title, tags, category, queries, id, className, backIsAnswered, votes, onVotesChange }) => {
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
				setShowStats((prev) => !prev);
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
		<div className={clsx('card rounded-2xl p-5 w-[60%] xl:w-[100%]', className)}>
			<PollHeader title={title} tags={tags} category={category} id={id} />
			<PollContent
				showStats={showStats}
				pollStat={pollStat}
				queries={queries}
				isDisabled={isDisabled}
				onClick={(answer) => {
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
				id={id}
				votes={votes}
				onVotesChange={onVotesChange}
			/>
		</div>
	);
};

export default Poll;
