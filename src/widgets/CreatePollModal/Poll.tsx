import React, { FC, useRef, useState } from 'react';
import Minus from '@/assets/images/minus.svg';
import Plus from '@/assets/images/plus.svg';
import SelectCategory from './SelectCategory/SelectCategory';
import PollAnswer from './PollQestion';
import PollQestion from './PollQestion';
import Button from '@/components/Button/Button';
import { createPoll } from './createPoll';
import TagsInput from './TagsInput/TagsInput';

export interface IAnswer {
	text: string;
}

export interface IQuestion {
	text: string;
	answers: IAnswer[];
}

export interface IPoll {
	name: string;
	questions: IQuestion[];
	tags: string[];
}

interface IPollProps {}

const Poll: FC<IPollProps> = ({}) => {
	const [poll, setPoll] = useState<IPoll>({
		name: '',
		questions: [
			{
				text: '',
				answers: [{ text: '' }, { text: '' }],
			},
		],
		tags: [],
	});
	const questionsContRef = useRef<HTMLDivElement>(null);
	const handleChangeQuestion = (question: string, questionInd: number) => {
		setPoll((prev) => {
			const newPoll = { ...prev };
			newPoll.questions[questionInd].text = question;
			return newPoll;
		});
	};
	const handleChangeAnswer = (answer: string, questionInd: number, answerInd: number) => {
		setPoll((prev) => {
			const newPoll = { ...prev };
			newPoll.questions[questionInd].answers[answerInd].text = answer;
			return newPoll;
		});
	};
	const handleAddQuestion = () => {
		setPoll((prev) => {
			return {
				...prev,
				questions: [...prev.questions, { text: '', answers: [{ text: '' }, { text: '' }] }],
			};
		});

		setTimeout(() => {
			if (!questionsContRef.current) return;
			questionsContRef.current.scrollTop = questionsContRef.current.scrollHeight;
		}, 10);
	};
	const handleRemoveQuestion = (questionInd: number) => {
		setPoll((prev) => {
			return {
				...prev,
				questions: prev.questions.filter((_, index) => index !== questionInd),
			};
		});
	};
	console.log(poll);
	const handleRemoveAnswer = (questionInd: number, answerInd: number) => {
		setPoll((prev) => {
			return {
				...prev,
				questions: prev.questions.map((qst, qInd) => {
					if (qInd !== questionInd) return qst;
					return {
						...qst,
						answers: qst.answers.filter((ans, aInd) => aInd !== answerInd),
					};
				}),
			};
		});
	};
	const handleAddAnswer = (questionInd: number) => {
		setPoll((prev) => {
			return {
				...prev,
				questions: prev.questions.map((qst, qInd) => {
					if (qInd !== questionInd) return qst;
					return {
						...qst,
						answers: [...qst.answers, { text: '' }],
					};
				}),
			};
		});
	};
	const handleNameChange = (name: string) => {
		setPoll((prev) => {
			return {
				...prev,
				name: name,
			};
		});
	};
	const handleTagsChange = (newTags: string[]) => {
		setPoll((prev) => {
			return {
				...prev,
				tags: [...prev.tags, ...newTags],
			};
		});
	};
	const handleDeleteLastTag = () => {
		setPoll((prev) => {
			return {
				...prev,
				tags: [...prev.tags.slice(0, -1)],
			};
		});
	};
	console.log(poll);
	return (
		<div className='h-full overflow-auto scrollbar-hide scroll-smooth' ref={questionsContRef}>
			{poll && (
				<div className='flex flex-col h-full min-h-0'>
					<h1 className='text-[32px] mb-[40px] md:text-[28px]'>Создайте свой опрос</h1>
					<input
						type='text'
						placeholder='Введите название опроса'
						className='border rounded-[5px] p-[10px] text-[20px] outline-0  mb-[20px]'
						value={poll.name}
						onChange={(e) => handleNameChange(e.currentTarget.value)}
					/>
					<SelectCategory />
					<TagsInput
						tags={poll.tags}
						tagsChange={(tags) => handleTagsChange(tags)}
						deleteLast={() => handleDeleteLastTag()}
					/>
					<div className='flex flex-col gap-[20px] bg-amber-50 '>
						{poll.questions.map((question, questionInd) => {
							return (
								<PollQestion
									key={questionInd}
									answers={question.answers}
									question={question}
									changeQuestion={(value) => handleChangeQuestion(value, questionInd)}
									changeAnswer={(value, answerInd) => handleChangeAnswer(value, questionInd, answerInd)}
									removeQuestion={() => handleRemoveQuestion(questionInd)}
									removeAnswer={(answerInd) => handleRemoveAnswer(questionInd, answerInd)}
									addAnswer={() => handleAddAnswer(questionInd)}
								/>
							);
						})}
					</div>
					<div
						className='ml-[10px] border-3 p-[5px] border-emerald-500 w-fit rounded-[50%] mt-[20px] bg-white cursor-pointer hover:scale-[1.1] duration-150'
						onClick={() => handleAddQuestion()}
					>
						<img src={Plus.src} alt='' className='w-[30px]' />
					</div>
					<Button
						text='Создать опрос'
						className='fixed right-[20px] bottom-[20px] md:left-[10px] md:bottom-[10px]'
						onClick={() => createPoll(poll)}
					/>
				</div>
			)}
		</div>
	);
};

export default Poll;
