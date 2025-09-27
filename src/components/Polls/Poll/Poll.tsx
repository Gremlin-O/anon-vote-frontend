"use client";
import Button from "@/components/Button/Button";
import clsx from "clsx";
import React, { FC, useState } from "react";
import { IAnswer, IQuery, usePolls } from "../api/usePolls";
import { axiosInstance } from "../../../../api";
import { useSubmitPoll } from "../api/useSubmitPoll";
import { useAuthStore } from "@/store/authStore";

interface IPollProps {
  id: string;
  title: string;
  tags: string[];
  queries: IQuery[];
  onSubmit: (responses: Record<string, string>) => void;
  className?: string;
}

// interface IPollAnswer extends IAnswer {
// 	isChosen: boolean;
// }

const Poll: FC<IPollProps> = ({
  title,
  tags,
  queries,
  onSubmit,
  id,
  className,
}) => {
  const [selectedResponses, setSelectedResponses] = useState<
    Record<string, IAnswer>
  >({});
  const { submitPoll } = useSubmitPoll(id);
  const { isAuthed } = useAuthStore();
  const handleSubmit = async () => {
    await submitPoll(selectedResponses);
  };

  return (
    <div
      className={clsx(
        "border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary",
        className
      )}
    >
      <div className="flex justify-between border-b border-[#7b1258] items-center">
        <h1 className="font-semibold text-[40px] md:text-[25px] text-primary">
          {title}
        </h1>
        <div className="flex flex-wrap gap-[10px] md:gap-[5px]">
          {tags.map((tag, tagInd) => {
            return (
              <p
                key={tagInd}
                className="text-primary text-[20px] text-black text-shadow-amber-200 font-semibold text-shadow-[2px_2px_3px] md:text-[16px] sm:text-[14px]"
              >
                #{tag}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[20px] mt-[20px]">
          {queries.map((query, queryInd) => {
            return (
              <div
                key={queryInd}
                className={clsx(
                  "border-medium rounded-[10px] p-[10px] bg-white relative",
                  {
                    inactive: !isAuthed,
                  }
                )}
              >
                <h1 className="text-[24px] sm:text-[18px] text-primary">
                  {query.text}
                </h1>
                {query.answers.map((answer, answerInd) => {
                  return (
                    <div
                      key={answerInd}
                      className="group flex gap-[5px] items-center w-full cursor-pointer"
                      onClick={() =>
                        setSelectedResponses((selectedResponses) => ({
                          ...selectedResponses,
                          [query.id]: answer,
                        }))
                      }
                    >
                      <div
                        className={clsx(
                          "group-hover:bg-primary duration-150 w-[10px] h-[10px] rounded-[50%] border-2 text-primary",
                          {
                            "bg-primary":
                              selectedResponses[query.id]?.id === answer.id,
                            "bg-transparent":
                              selectedResponses[query.id]?.id !== answer.id,
                          }
                        )}
                      ></div>
                      <p className="text-[20px] sm:text-[14px] text-primary">
                        {answer.response}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        text="Сохранить ответы"
        className={clsx("mt-[20px] w-fit text-primary", {
          inactive: !isAuthed,
        })}
      />
    </div>
  );
};

export default Poll;
