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
    <Modal show={show} className="w-[40%] h-[30%]" onClose={onClose}>
      <div className="p-[20px]">
        <h1 className="text-primary text-[40px]">Выйти из аккаунта?</h1>
        <div className="flex gap-[20px] mt-[40px]">
          <Button
            text="Да"
            onClick={async () => {
              try {
                await logout();
                setIsAuthed(false);
                onClose();
              } catch (error) {}
            }}
            className="w-[100px] text-[24px]"
          />
          <Button
            text="Нет"
            onClick={() => onClose()}
            className="w-[100px] text-[24px]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
