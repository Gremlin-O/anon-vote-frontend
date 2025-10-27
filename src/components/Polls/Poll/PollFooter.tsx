import Button from "@/components/Button/Button";
import clsx from "clsx";
import React, { FC } from "react";

interface IPollFooterProps {
  onClick: () => void;
  isDisabled: boolean;
  statisticsImg: string;
  toggleStats: () => void;
}

const PollFooter: FC<IPollFooterProps> = ({
  onClick,
  isDisabled,
  statisticsImg,
  toggleStats,
}) => {
  return (
    <div className="flex justify-between items-center mt-[20px] ">
      <Button
        onClick={() => onClick()}
        text="Сохранить ответы"
        className={clsx("w-fit text-primary", {
          inactive: isDisabled,
        })}
      />
      <img
        src={statisticsImg}
        alt=""
        className="w-[50px] cursor-pointer"
        onClick={() => toggleStats()}
      />
    </div>
  );
};

export default PollFooter;
