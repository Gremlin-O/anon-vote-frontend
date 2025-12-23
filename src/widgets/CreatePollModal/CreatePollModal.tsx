import { FC } from "react";
import Modal from "../Modal/Modal";
import CreatePollForm from "./CreatePollForm";

interface ICreatePollModalProps {
  show: boolean;
  onClose?: () => void;
}
export const CreatePollModalId = "create-poll-modal";

const CreatePollModal: FC<ICreatePollModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-[20px] md:w-full h-full md:p-[15px]">
        <CreatePollForm onSubmit={() => onClose?.()} />
      </div>
    </Modal>
  );
};

export default CreatePollModal;
