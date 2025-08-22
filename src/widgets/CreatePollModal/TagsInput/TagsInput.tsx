import React, { FC, useState } from 'react';

interface ITagsInputProps {
	tags: string[];
	tagsChange: (tags: string[]) => void;
	deleteLast: () => void;
}

const TagsInput: FC<ITagsInputProps> = ({ tags, tagsChange, deleteLast }) => {
	const [tagsInputValue, setTagsInputValue] = useState<string>('');

	return (
		<div className='flex gap-[5px] border rounded-[5px] p-[8px] text-[16px] outline-0 mb-[20px] items-center flex-wrap max-w-full overflow-x-auto'>
			{tags.map((tag, tagInd) => {
				return (
					<div key={tagInd} className='p-[5px] border-2 border-amber-500 rounded-[10px] bg-gray-100'>
						{tag}
					</div>
				);
			})}
			<input
				type='text'
				placeholder={tags.length === 0 ? 'Введите тэги через пробел' : ''}
				className='text-[16px] outline-0 flex-1 min-w-0'
				value={tagsInputValue}
				onChange={(e) => setTagsInputValue(e.currentTarget.value)}
				onBlur={() => {
					tagsChange(tagsInputValue.split(' ').filter((tag) => tag.length > 0));
					setTagsInputValue('');
				}}
				onKeyDown={(e) => {
					if (e.key === 'Backspace' && tagsInputValue === '') {
						deleteLast();
					}
				}}
			/>
		</div>
	);
};

export default TagsInput;
