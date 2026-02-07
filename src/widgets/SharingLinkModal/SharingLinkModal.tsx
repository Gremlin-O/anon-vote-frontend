import React, { FC, useState } from "react";
import Modal from "../Modal/Modal";
import CopyImg from "@/assets/images/copy.svg";
import clsx from "clsx";

interface SharingLinkModalProps {
  show: boolean;
  onClose: () => void;
  pollId: string;
}

const SharingLinkModal: FC<SharingLinkModalProps> = ({
  show,
  onClose,
  pollId,
}) => {
  const [message, setMessage] = useState<{ text: string; success: boolean }>();

  const copyToClipboard = (text: string): void => {
    // Способ 1: Использование modern Clipboard API (требует HTTPS или localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setMessage({ text: "Ссылка успешно скопирована", success: true });
        })
        .catch(() => {
          // Если modern API не сработал, используем fallback
          useFallbackCopyMethod(text);
        });
    } else {
      // Способ 2: Использование fallback метода для HTTP
      useFallbackCopyMethod(text);
    }
  };

  const useFallbackCopyMethod = (text: string): void => {
    try {
      // Метод 1: Создание временного textarea элемента
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Сделать textarea невидимым
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);

      // Выделить и скопировать текст
      textArea.focus();
      textArea.select();

      // Для старых браузеров
      const range = document.createRange();
      range.selectNodeContents(textArea);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);

      // Попытка копирования
      const successful = document.execCommand("copy");

      // Удалить временный элемент
      document.body.removeChild(textArea);

      if (successful) {
        setMessage({ text: "Ссылка успешно скопирована", success: true });
      } else {
        setMessage({
          text: "Не удалось скопировать ссылку. Скопируйте вручную",
          success: false,
        });
      }
    } catch (err) {
      console.error("Ошибка при копировании:", err);
      setMessage({
        text: "Не удалось скопировать ссылку. Скопируйте вручную",
        success: false,
      });
    }
  };

  // Функция для сброса сообщения через некоторое время
  const resetMessage = () => {
    setTimeout(() => {
      setMessage(undefined);
    }, 3000); // Сообщение исчезнет через 3 секунды
  };

  const handleCopyClick = () => {
    const link = `http://anon-vote.ru/poll/${pollId}`;
    copyToClipboard(link);
    resetMessage();
  };

  return (
    <div>
      <Modal
        show={show}
        className="w-[30%] min-h-[25%] max-h-[25%] lg:w-[60%]"
        onClose={onClose}
      >
        <div className="mb-[20px] flex flex-col justify-center h-full">
          {/* <div
            className="flex gap-[10px] w-full justify-center p-[10px] rounded-[20px] cursor-pointer group duration-150 items-center"
            onClick={handleCopyClick}
          >
            <h2 className="text-primary font-bold text-[28px] md:text-[20px]">
              Поделиться опросом
            </h2>
            <img
              src={CopyImg.src}
              alt="Копировать ссылку"
              className="w-[40px] group-hover:scale-[1.1] duration-100"
            />
          </div> */}
          <div className="mt-4 px-4">
            <p className="text-primary text-[16px] mb-2 text-center">
              Ссылка на опрос:
            </p>
            <div
              className="bg-gray-100 p-3 rounded-lg border border-gray-300 cursor-text select-all"
              onClick={(e) => {
                e.stopPropagation();
                // Выделяем весь текст при клике
                const range = document.createRange();
                range.selectNodeContents(e.currentTarget);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
              }}
            >
              <code className="text-primary text-[14px] break-all">
                http://anon-vote.ru/poll/{pollId}
              </code>
            </div>
          </div>
          {/* Сообщение о результате копирования */}
          {message && (
            <p
              className={clsx(
                "text-center text-[18px] mt-4 p-2 rounded-lg transition-all duration-300",
                {
                  "text-green-600 bg-green-50": message.success,
                  "text-red-600 bg-red-50": !message.success,
                },
              )}
            >
              {message.text}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SharingLinkModal;
