import React, { FC } from 'react';
import Minus from '@/assets/images/minus.svg';
import Plus from '@/assets/images/plus.svg';
import { IAnswer, IQuestion } from './CreatePollForm';
import { useMobile } from '@/shared/utils/useMobile';

interface IPollQuestionProps {
	answers: IAnswer[];
	question: IQuestion;
	changeQuestion: (value: string) => void;
	changeAnswer: (value: string, answerInd: number) => void;
	removeQuestion: () => void;
	removeAnswer: (answerInd: number) => void;
	addAnswer: () => void;
}

const PollQestion: FC<IPollQuestionProps> = ({
	answers,
	question,
	changeQuestion,
	changeAnswer,
	removeQuestion,
	removeAnswer,
	addAnswer,
}) => {
	const isMobile = useMobile();
	return (
		<div className='rounded-xl border-2 border-[#b89aad] bg-white text-primary flex flex-col gap-3 p-4 shadow-sm md:p-3'>
			<div className='flex w-full gap-3 items-center md:flex-col md:items-start md:gap-2'>
				{isMobile && (
					<div className='btn-icon-remove w-8 h-8' onClick={() => removeQuestion()}>
						<img src={Minus.src} alt='' className='w-4' />
					</div>
				)}
				<input
					value={question.text}
					onChange={(e) => changeQuestion(e.currentTarget.value)}
					type='text'
					placeholder='Введите вопрос'
					className='input-field-contrast md:w-full p-2.5 text-[16px] flex-1 md:text-[15px]'
				/>
				{!isMobile && (
					<div className='btn-icon-remove w-9 h-9' onClick={() => removeQuestion()}>
						<img src={Minus.src} alt='' className='w-4' />
					</div>
				)}
			</div>
			{answers &&
				answers.map((answer, answerInd) => (
					<div className='flex w-[60%] gap-2.5 items-center flex-wrap md:w-full' key={answerInd}>
						<input
							value={answer.text}
							onChange={(e) => changeAnswer(e.currentTarget.value, answerInd)}
							type='text'
							placeholder='Введите ответ'
							className='input-field-contrast p-2.5 text-[15px] flex-1'
						/>
						{answers.length > 2 && (
							<div className='btn-icon-remove w-8 h-8' onClick={() => removeAnswer(answerInd)}>
								<img src={Minus.src} alt='' className='w-3.5' />
							</div>
						)}
					</div>
				))}
			<div className='btn-icon-add p-2 w-fit' onClick={() => addAnswer()}>
				<img src={Plus.src} alt='' className='w-4' />
			</div>
		</div>
	);
};

export default PollQestion;
