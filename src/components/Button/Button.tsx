import React, { ReactNode, type FC } from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps {
  text: string;
  className?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: FC<IButtonProps> = ({
  text,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      className={twMerge(
        "text-[16px] text-center font-semibold border-medium text-primary bg-white p-[10px] cursor-pointer rounded-[20px] select-none duration-100 hover:border-zinc-500 ",
        className
      )}
      onClick={(e) => onClick?.(e)}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
