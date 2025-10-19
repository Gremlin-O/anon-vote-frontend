"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "@/components/Button/Button";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { authUser } from "./authUser";
import { sendCode } from "./sendCode";
import clsx from "clsx";

interface ILoginModalProps {
  show: boolean;
  onClose: () => void;
}

export const LoginModalId = "login-modal";

const DefaultTimeBetweenEmail = 60;

const LoginModal: FC<ILoginModalProps> = ({ show, onClose }) => {
  const [mail, setMail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [codeIsSent, setCodeIsSent] = useState<boolean>(true);
  const [authUserError, setauthUserError] = useState<string>("");
  const [timeLeftTillRefetch, setTimeLeftTillRefetch] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { isAuthed, setIsAuthed } = useAuthStore();

  useEffect(() => {
    if (show) {
      setCodeIsSent(false);
      setCode("");
    }
    if (!isAuthed) {
      setCodeIsSent(false);
      setCode("");
      setTimeLeftTillRefetch(0);
    }
  }, [show, sendCode, setCodeIsSent, isAuthed]);

  const startSendCodeTimer = () => {
    setTimeLeftTillRefetch(DefaultTimeBetweenEmail);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeftTillRefetch((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timeLeftTillRefetch <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeftTillRefetch(0);
    }
  }, [timeLeftTillRefetch, setTimeLeftTillRefetch]);

  const handleAuthClick = async () => {
    try {
      await authUser(mail, code);
      onClose();
      setIsAuthed(true);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setauthUserError(error.message);
      }
    }
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <Modal
      show={show}
      className="w-[30%] min-h-[60%] h-auto lg:w-[60%] "
      onClose={onClose}
    >
      <div className="p-[20px] w-fit">
        <h1 className="text-[32px] mb-[40px] text-primary md:text-[28px]">
          Вход
        </h1>

        <input
          value={mail}
          onChange={(e) => setMail(e.currentTarget.value)}
          type="text"
          placeholder="Введите вашу почту"
          className="min-w-[300px] border-medium bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0 flex-1 mb-[20px] md:w-full md:min-w-0"
        />
        {emailError && (
          <div>
            <p className="text-red-500 text-[18px] -mt-[10px] mb-[10px]">
              Неверно введена почта
            </p>
          </div>
        )}
        {codeIsSent && (
          <input
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            type="text"
            placeholder="Введите код"
            className={clsx(
              "min-w-[300px] border-medium bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0 flex-1 mb-[20px] md:w-full md:min-w-0"
            )}
          />
        )}
        {authUserError != "" && (
          <div>
            <p className="text-red-500 text-[18px] -mt-[10px] mb-[10px]">
              Неверный код
            </p>
          </div>
        )}
        <div className="flex gap-[20px]">
          <Button
            text={codeIsSent ? "Повторно выслать код" : "Выслать код"}
            className={clsx("w-[70%] md:w-full mb-[20px]", {
              inactive: timeLeftTillRefetch > 0,
            })}
            onClick={() => {
              if (timeLeftTillRefetch > 0) return;

              if (validateEmail(mail)) {
                startSendCodeTimer();
                setCodeIsSent(true);
                sendCode(mail);
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
          />
          {timeLeftTillRefetch !== 0 && (
            <p className="text-red-500 text-[16px]">
              {timeLeftTillRefetch} секунд осталось
            </p>
          )}
        </div>
        {codeIsSent && (
          <Button
            text="Проверить код"
            className="w-[70%] md:w-full"
            onClick={() => {
              handleAuthClick();
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
