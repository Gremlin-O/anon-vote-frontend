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
      <div className="p-6 w-fit">
        <h1 className="page-title mb-8 md:text-[24px] md:mb-6">Вход</h1>

        <input
          value={mail}
          onChange={(e) => setMail(e.currentTarget.value)}
          type="text"
          placeholder="Введите вашу почту"
          className="input-field min-w-[300px] p-3 text-[16px] flex-1 mb-5 md:w-full md:min-w-0 w-full"
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
            className="input-field min-w-[300px] p-3 text-[16px] flex-1 mb-5 md:w-full md:min-w-0 w-full"
          />
        )}
        {authUserError != "" && (
          <div>
            <p className="text-red-500 text-[18px] -mt-[10px] mb-[10px]">
              Неверный код
            </p>
          </div>
        )}
        <div className="flex gap-4 items-center flex-wrap">
          <Button
            text={codeIsSent ? "Повторно выслать код" : "Выслать код"}
            className={clsx("btn-filled w-[70%] md:w-full mb-5", {
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
            className="btn-filled w-[70%] md:w-full"
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
