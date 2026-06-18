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
        "btn-outline text-[15px] text-center px-4 py-2.5 cursor-pointer rounded-xl select-none duration-200 hover:shadow-sm active:scale-[0.98]",
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
