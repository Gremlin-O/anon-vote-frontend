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
        "border-medium rounded-[10px] p-[10px] bg-white relative",
        {
          inactive: isDisabled,
        }
      )}
    >
      <h1 className="text-[24px] sm:text-[18px] text-primary">{query.text}</h1>
      {query.answers.map((answer, answerInd) => {
        return (
          <div
            key={answer + answerInd}
            className="group flex gap-[5px] items-center w-full cursor-pointer"
            onClick={() => onClick(answer)}
            // }
          >
            <div
              className={clsx(
                "group-hover:bg-primary duration-150 w-[10px] h-[10px] rounded-[50%] border-2 text-primary",
                {
                  "bg-primary": selectedResponses[query.id] === answer,
                  "bg-transparent": selectedResponses[query.id] !== answer,
                }
              )}
            ></div>
            <p className="text-[20px] sm:text-[14px] text-primary">{answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PollQuery;
