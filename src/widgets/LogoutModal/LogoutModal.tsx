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
      <div className="p-[20px]">
        <h1 className="text-primary mt-[20px] text-[40px] lg:text-[32px] md:text-[28px]">
          Выйти из аккаунта?
        </h1>
        <div className="flex gap-[20px] mt-[40px] md:mt-[20px]">
          <Button
            text="Да"
            onClick={async () => {
              try {
                await logout();
                setIsAuthed(false);
                onClose();
              } catch (error) {}
            }}
            className="w-[100px] text-[24px] md:w-[70px] md:text-[20px]"
          />
          <Button
            text="Нет"
            onClick={() => onClose()}
            className="w-[100px] text-[24px] md:w-[70px] md:text-[20px]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
