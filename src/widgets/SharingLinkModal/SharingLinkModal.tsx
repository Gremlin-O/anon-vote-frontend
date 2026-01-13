import React, { FC } from 'react';
import Modal from '../Modal/Modal';
import CopyImg from '@/assets/images/copy.svg';

interface SharingLinkModalProps {
	show: boolean;
	onClose: () => void;
	pollId: string;
}

const copyToClipboard = async (text: string) => {
	// if (navigator.clipboard && window.isSecureContext) {
	// 	try {
	// 		await navigator.clipboard.writeText(text);

	// 		window.alert('Ссылка успешно скопирована');
	// 		return true;
	// 	} catch (e) {
	// 		window.alert('Ошибка при копировании');
	// 	}
	// }
	const input = document.createElement('input');

	document.body.appendChild(input);
	input.value = text;

	input.select();
	input.setSelectionRange(0, 99999); /* for mobail */
	document.execCommand('copy');

	document.body.removeChild(input);
};

const SharingLinkModal: FC<SharingLinkModalProps> = ({ show, onClose, pollId }) => {
	return (
		<div>
			<Modal show={show} className='w-[30%] min-h-[20%] max-h-[20%] lg:w-[60%] ' onClose={onClose}>
				<div
					className='flex gap-[10px]  w-full h-full justify-center p-[10px] rounded-[20px] mb-[20px] cursor-pointer group duration-150 items-center'
					onClick={() => {
						copyToClipboard(`http://anon-vote.ru/poll/${pollId}`);
					}}
				>
					<h2 className='text-primary font-bold text-[28px] md:text-[20px]'>Поделиться опросом</h2>
					<img src={CopyImg.src} alt='' className='w-[40px] group-hover:scale-[1.1] duration-100' />
				</div>
			</Modal>
		</div>
	);
};

export default SharingLinkModal;
