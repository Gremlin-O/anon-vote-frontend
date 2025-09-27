"use client";
import Close from "@/assets/close.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { Transition } from "react-transition-group";
import { motion, AnimatePresence } from "motion/react";

interface IModalProps {
  show: boolean;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

const ExitTimer = 0.2;

const Modal: FC<IModalProps> = ({ children, className, show, onClose }) => {
  const [isClient, setIsClient] = useState(false);
  const bgScrollTop = useRef<number>(
    typeof document !== "undefined" ? document.body.scrollTop : 0
  );

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      bgScrollTop.current = document.body.scrollTop;
    } else {
      document.body.style.overflow = "auto";
      document.body.scrollTop = bgScrollTop.current;
    }
  }, [show]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return typeof document === "undefined" || !isClient
    ? null
    : createPortal(
        <AnimatePresence>
          {show && (
            <>
              <motion.div
                onClick={onClose}
                key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{
                  duration: 0.3,
                  scale: { type: "spring", visualDuration: 0.2, bounce: 0.4 },
                }}
                className="bg-black w-[100vw] h-[100vh] fixed left-0 top-0 z-20"
                exit={{
                  opacity: 0,
                  transition: {
                    type: "spring",
                    visualDuration: ExitTimer,
                    bounce: 0.4,
                  },
                }}
              ></motion.div>
              <motion.div
                key={2}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    type: "spring",
                    visualDuration: ExitTimer,
                    bounce: 0.4,
                  },
                }}
                transition={{
                  duration: 0.3,
                  scale: { type: "spring", visualDuration: 0.2, bounce: 0.4 },
                }}
                className={twMerge(
                  "fixed left-[50%] top-[50%] translate-[-50%] w-[70%] h-[90%] bg-secondary border-4 border-[#7b1258] rounded-[20px] md:flex md:w-[85%] z-20",
                  clsx({}),

                  className
                )}
              >
                <img
                  src={Close.src}
                  className="absolute top-[20px] right-[20px] w-[40px] cursor-pointer duration-75 hover:scale-[1.2] md:w-[30px] md:top-[10px] md:right-[10px] md:hover:scale-[1.1]"
                  onClick={onClose}
                />
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.getElementById("modals")!
      );
};

export default Modal;
