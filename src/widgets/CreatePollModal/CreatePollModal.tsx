import { FC } from 'react';
import Modal from '../Modal/Modal';
import Poll from './Poll';

interface ICreatePollModalProps {
	show: boolean;
	onClose?: () => void;
}

export const CreatePollModalId = 'create-poll-modal';

const CreatePollModal: FC<ICreatePollModalProps> = ({ show, onClose }) => {
	return (
		<Modal show={show} onClose={onClose}>
			<div className='p-[20px] h-full md:p-[15px]'>
				<Poll />
			</div>
		</Modal>
	);
};

export default CreatePollModal;
