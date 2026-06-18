import { FC } from "react";
import Modal from "../Modal/Modal";
import Button from "@/components/Button/Button";
import { logout } from "./logout";
import { useAuthStore } from "@/store/authStore";

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ show, onClose }) => {
  const { setIsAuthed } = useAuthStore();

  return (
    <Modal
      show={show}
      className="w-[40%] h-[30%] lg:w-[50%] lg:h-[35%]"
      onClose={onClose}
    >
      <div className="p-6">
        <h1 className="page-title mt-2 lg:text-[28px] md:text-[24px]">
          Выйти из аккаунта?
        </h1>
        <div className="flex gap-4 mt-8 md:mt-5">
          <Button
            text="Да"
            onClick={async () => {
              try {
                await logout();
                setIsAuthed(false);
                onClose();
              } catch (error) {}
            }}
            className="w-[100px] text-[18px] md:w-[70px] md:text-[16px] btn-filled"
          />
          <Button
            text="Нет"
            onClick={() => onClose()}
            className="w-[100px] text-[18px] md:w-[70px] md:text-[16px]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
