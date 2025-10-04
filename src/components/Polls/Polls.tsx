'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IPoll, usePolls } from './api/usePolls';
import Poll from './Poll/Poll';
import Search from '../Search/Search';
import { searchPolls } from './api/searchPolls';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDebounce } from './useDebounce';
import { useNearBottom } from './useNearBottom';

const getSearchProperties = (search: string) => {
	const tags: string[] = [];
	while (search.indexOf('#') > -1) {
		const start = search.indexOf('#') + 1;
		let end = search.indexOf(' ', start);
		if (end < 0) end = search.length;
		tags.push(search.slice(start, end));
		console.log(start, end);
		search = search.slice(0, start - 1) + search.slice(end + 1);
	}
	return {
		search,
		tags,
	};
};
// const mergeData = (prevData: IPoll[], newData: IPoll[]) => {
// 	return
// }

const Polls = () => {
	const [page, setPage] = useState<number>(0);
	const { isNearBottom, triggerRef, setIsNearBottom } = useNearBottom({
		threshold: 0.1,
		rootMargin: '100px',
	});
	const { currentCategory } = useCategoriesStore();
	const [polls, setPolls] = useState<IPoll[]>([]);

	const answers = useState<Record<string, { response: string; isChosen: boolean }[]>[]>();
	const [searchValue, setSearchValue] = useState<string>('');

	const searchPollsFn = useCallback(async () => {
		const { search, tags } = getSearchProperties(searchValue);
		try {
			const pollsPage = await searchPolls(search, tags, page, currentCategory?.id);
			setPolls((prev) => [...prev, ...pollsPage.content]);
		} catch (err) {}
	}, [searchValue, currentCategory, setPolls, page]);

	const searchPollsDebounced = useDebounce(searchPollsFn, 300);

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
		console.log('firset', page);
		setPolls([]);
	}, [searchValue, setPage]);

	useEffect(() => {
		searchPollsDebounced();
	}, [searchPollsDebounced]);

	const handleSubmitClick = () => {};
	return (
		<>
			<Search
				value={searchValue}
				onChangeValue={setSearchValue}
				className='ml-0! w-[60%]! md:w-full! '
			/>
			<div className=' rounded-[20px] box-border mt-[20px] flex flex-col max-h-full gap-[20px] overflow-auto flex-1 scrollbar-hide'>
				{polls?.map((poll, pollInd) => {
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
				<div ref={triggerRef} className='h-[1px]'></div>
			</div>
		</>
	);
};

export default Polls;
