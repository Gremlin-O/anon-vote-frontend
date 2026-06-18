import React, { FC } from "react";
import { IQuery } from "../api/models";
import clsx from "clsx";

interface IPollQueryProps {
  query: IQuery;
  isDisabled: boolean;
  onClick: (answer: string) => void;
  selectedResponses: Record<string, string>;
}

const PollQuery: FC<IPollQueryProps> = ({
  query,
  isDisabled,
  onClick,
  selectedResponses,
}) => {
  return (
    <div
      key={query.id}
      className={clsx(
        "rounded-xl p-4 bg-white border-2 border-[#b89aad] shadow-sm relative",
        { inactive: isDisabled }
      )}
    >
      <h1 className="text-[18px] sm:text-[16px] text-primary font-semibold mb-3">{query.text}</h1>
      <div className="flex flex-col gap-1">
        {query.answers.map((answer, answerInd) => {
          const isSelected = selectedResponses[query.id] === answer;
          return (
            <div
              key={answer + answerInd}
              className={clsx(
                "group flex gap-3 items-center w-full cursor-pointer rounded-lg px-3 py-2.5 transition-colors duration-150 border border-transparent",
                {
                  "bg-[#ffce78] border-[#e6b040]": isSelected,
                  "hover:bg-[#f3eef2] hover:border-[#d4c4cf]": !isSelected,
                }
              )}
              onClick={() => onClick(answer)}
            >
              <div
                className={clsx(
                  "duration-150 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0",
                  {
                    "border-[#7b1258] bg-[#7b1258]": isSelected,
                    "border-[#b89aad] bg-white group-hover:border-[#7b1258]": !isSelected,
                  }
                )}
              >
                {isSelected && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
              </div>
              <p className="text-[15px] sm:text-[14px] text-primary font-medium">{answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollQuery;
