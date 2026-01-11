'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Poll from './Poll/Poll';
import Search from '../Search/Search';
import { searchPolls } from './api/searchPolls';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDebounce } from './useDebounce';
import { useNearBottom } from './useNearBottom';
import { ThreeDot } from 'react-loading-indicators';
import PollTagsInput from './PollTagsInput';
import { sendAnswers } from './api/sendAnswers';
import { IPoll } from './api/models';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/widgets/Modal/useModal';
import TelegramImg from '@/assets/images/telegram.svg';

const Polls = () => {
	const categoriesModal = useModal('categories-modal');
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(0);
	const { isNearBottom, triggerRef, setIsNearBottom } = useNearBottom({
		threshold: 0.1,
		rootMargin: '100px',
	});
	const { currentCategory, setCurrentCategory, setSelectedPath } = useCategoriesStore();
	const { isAuthed } = useAuthStore();
	const [polls, setPolls] = useState<IPoll[]>([]);

	const [search, setSearch] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);

	const searchPollsFn = useCallback(async () => {
		if (categoriesModal.isShown === false) {
			setIsLoading(true);
			try {
				const pollsPage = await searchPolls(search, tags, page, currentCategory?.id);
				setTimeout(() => {
					setPolls((prev) => [...prev, ...pollsPage.content]);
					setHasNextPage(pollsPage.hasNextPage);
				}, 100);
			} catch (err) {
			} finally {
				setIsLoading(false);
			}
		} else {
			return;
		}
	}, [search, tags, currentCategory, setPolls, page, setHasNextPage, isAuthed, categoriesModal.isShown]);

	const searchPollsDebounced = useDebounce(searchPollsFn, 300);
	// useEffect(() => {
	//   searchPollsFn();
	//   console.log("r");
	// }, [searchPollsFn]);

	useEffect(() => {
		if (isNearBottom) {
			if (polls.length > 0) {
				setPage(page + 1);
			}
			setIsNearBottom(false);
		}
	}, [isNearBottom, setPage, setIsNearBottom]);

	useEffect(() => {
		setPage(0);
		setPolls([]);
		setHasNextPage(true);
	}, [search, tags, currentCategory, setPage, setHasNextPage, isAuthed, categoriesModal.isShown]);

	useEffect(() => {
		if (hasNextPage) {
			searchPollsDebounced();
		}
	}, [searchPollsDebounced, hasNextPage]);

	const handleInputChange = (tags: string[], search: string) => {
		setTags(tags);
		setSearch(search);
	};

	return (
		<>
			{currentCategory ? (
				<p className='text-primary -mt-[20px] mb-[10px] text-[20px] md:text-[16px]'>
					Поиск по категории: {currentCategory.name}
				</p>
			) : (
				<p className='text-primary -mt-[20px] mb-[10px] text-[20px] md:text-[16px]'>
					Категория не выбрана
				</p>
			)}
			<div
				className='flex gap-[10px] border-medium w-fit p-[10px] rounded-[20px] mb-[20px] cursor-pointer hover:scale-[1.02] duration-150 items-center'
				onClick={() => window.open('https://t.me/paul_017', '_blank')}
			>
				<h2 className='text-primary font-bold text-[20px] md:text-[20px]'>Телеграмм бот ресурса: </h2>
				<img src={TelegramImg.src} alt='' className='w-[35px]' />
			</div>
			<PollTagsInput
				clearCategory={() => {
					setCurrentCategory(undefined);
					setSelectedPath([0]);
				}}
				isSelected={currentCategory !== undefined}
				tags={tags}
				search={search}
				className='ml-0! w-[60%]! md:w-full!'
				inputChange={(tags, search) => {
					handleInputChange(tags, search);
				}}
				modal={categoriesModal}
			/>
			<div className=' rounded-[20px] box-border mt-[20px] flex flex-col max-h-full gap-[20px] overflow-auto flex-1 scrollbar-hide'>
				{polls?.map((poll, pollInd) => {
					return (
						<Poll
							id={poll.id}
							key={poll.id}
							title={poll.title}
							tags={poll.tags}
							queries={poll.queries}
							backIsAnswered={poll.isAnswered}
						></Poll>
					);
				})}
				{isLoading && (
					<div className='w-full flex justify-center mt-[40px]'>
						<ThreeDot color='#7b1258' size='large' text='' textColor='' />
					</div>
				)}

				<div ref={triggerRef} className='h-[1px]'></div>
			</div>
		</>
	);
};

export default Polls;
