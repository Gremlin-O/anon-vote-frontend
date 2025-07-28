import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Options from '@/components/Options/Options';
import Search from '@/components/Search/Search';
import Arrow from '@/assets/images/arrow.svg';
import { IOption, useCategories } from './api/useCategoriese';
import Button from '@/components/Button/Button';

interface ICategoriesModalProps {
	show: boolean;
	children?: ReactNode;
	onClose?: () => void;
}

const CategoriesModal: FC<ICategoriesModalProps> = ({ show, children, onClose }) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedPath, setSelectedPath] = useState<number[]>([0]);
	const options = useCategories();

	const filterOptions = (items: IOption[], searchValue: string) => {
		const paths: number[][] = [];

		const filterOptionsRec = (items: IOption[], prev: number[] = [0]) => {
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item.name.toLowerCase().includes(searchValue.toLowerCase()) && searchValue.length > 0) {
					paths.push([...prev, i]);
				} else if (item.children) {
					filterOptionsRec(item.children, [...prev, i]);
				}
			}
		};

		filterOptionsRec(items);

		return paths;
	};

	const filteredPaths = useMemo(
		() => filterOptions(typeof options === 'undefined' ? [] : options, searchValue),
		[searchValue]
	);
	console.log(filteredPaths);

	useEffect(() => {
		if (filteredPaths.length) {
			setSelectedPath(filteredPaths[0]);
		}
	}, [filteredPaths, setSelectedPath]);

	const handleMoveFilteredPaths = (dx: number) => {
		const newIndex =
			(filteredPaths.indexOf(selectedPath) + dx + filteredPaths.length) % filteredPaths.length;
		setSelectedPath(filteredPaths[newIndex]);
	};

	return (
		<div>
			<Modal show={show} onClose={onClose}>
				<div className='p-[20px]'>
					{filteredPaths.length > 0 && (
						<div className='absolute top-[80px] right-[20px] flex flex-col items-center'>
							<div>
								<p>
									{filteredPaths.indexOf(selectedPath) + 1}/{filteredPaths.length}
								</p>
							</div>
							<div className='flex gap-1'>
								<img
									src={Arrow.src}
									className='rotate-[180deg] w-[20px] cursor-pointer duration-100 hover:scale-[1.1]'
									onClick={() => handleMoveFilteredPaths(-1)}
								/>
								<img
									src={Arrow.src}
									className='w-[20px] cursor-pointer duration-100 hover:scale-[1.1]'
									onClick={() => handleMoveFilteredPaths(1)}
								/>
							</div>
						</div>
					)}
					<Search onChangeValue={(value) => setSearchValue(value)} value={searchValue} />
					<Options
						options={typeof options === 'undefined' ? [] : options}
						path={selectedPath}
						onChange={(newPath) => setSelectedPath(newPath)}
					/>
					<Button text='Показать выбранные категории' className='absolute bottom-[20px] right-[20px]' />
				</div>
			</Modal>
		</div>
	);
};

export default CategoriesModal;
