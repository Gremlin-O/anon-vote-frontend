import React, { FC } from "react";
import { IQuery } from "../api/models";
import PollQuery from "./PollQuery";
import { PollQuestionStat } from "@/components/Stat/PollQuestionStat";
import { IStat, mockData } from "@/components/Stat/Stat";

interface IPollContentProps {
  queries: IQuery[];
  isDisabled: boolean;
  onClick: (answer: Record<string, string>) => void;
  selectedResponses: Record<string, string>;
  showStats: boolean;
  pollStat?: IStat;
}

const PollContent: FC<IPollContentProps> = ({
  queries,
  isDisabled,
  onClick,
  selectedResponses,
  showStats,
  pollStat,
}) => {
  const getDefaultQstStat = (query: IQuery) => {
    const data: Record<string, number> = {};
    for (const answer in query.answers) {
      data[answer] = 0;
    }
    return data;
  };

  return (
    <div>
      <div className="flex flex-col gap-[20px] mt-[20px]">
        {queries.map((query) => {
          return !showStats ? (
            <PollQuery
              key={query.id}
              query={query}
              isDisabled={isDisabled}
              onClick={(answer) =>
                onClick({
                  ...selectedResponses,
                  [query.id]: answer,
                })
              }
              selectedResponses={selectedResponses}
            />
          ) : (
            <PollQuestionStat
              key={query.id}
              data={pollStat?.data?.[query.id] ?? getDefaultQstStat(query)}
              questionText={query.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PollContent;
