"use client";
import Button from "@/components/Button/Button";
import { useAuthStore } from "@/store/authStore";
import clsx from "clsx";
import { FC, useState } from "react";
import { useSubmitPoll } from "../api/useSubmitPoll";
import { sendAnswers } from "../api/sendAnswers";
import { IQuery } from "../api/models";
import Link from "next/link";

interface IPollProps {
  id: string;
  title: string;
  tags: string[];
  queries: IQuery[];
  className?: string;
  backIsAnswered: boolean;
}

// interface IPollAnswer extends IAnswer {
// 	isChosen: boolean;
// }

const Poll: FC<IPollProps> = ({
  title,
  tags,
  queries,
  id,
  className,
  backIsAnswered,
}) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();
  const [selectedResponses, setSelectedResponses] = useState<
    Record<string, string>
  >({});
  const { isAuthed } = useAuthStore();
  const isDisabled = !isAuthed || isAnswered || backIsAnswered;

  const handleSubmitClick = async () => {
    if (isDisabled) return;
    if (Object.keys(selectedResponses).length < queries.length)
      setErrorText("Даны не все ответы!))");
    try {
      await sendAnswers(id, selectedResponses);
      setIsAnswered(true);
      setErrorText("");
    } catch (error) {}
  };

  return (
    <div
      className={clsx(
        "border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary",
        className
      )}
    >
      <div className="flex justify-between border-b border-[#7b1258] items-center">
        <h1 className="font-semibold text-[40px] md:text-[25px] text-primary cursor-pointer">
          <Link href={`/poll/${id}`}>{title}</Link>
        </h1>
        <div className="flex flex-wrap gap-[10px] md:gap-[5px]">
          {tags.map((tag) => {
            return (
              <p
                key={tag}
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
          {queries.map((query) => {
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
                <h1 className="text-[24px] sm:text-[18px] text-primary">
                  {query.text}
                </h1>
                {query.answers.map((answer, answerInd) => {
                  return (
                    <div
                      key={answer}
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
                              selectedResponses[query.id] === answer,
                            "bg-transparent":
                              selectedResponses[query.id] !== answer,
                          }
                        )}
                      ></div>
                      <p className="text-[20px] sm:text-[14px] text-primary">
                        {answer}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {errorText != "" && (
        <div>
          <p className="text-[20px] text-red-500 mt-[7px] -mb-[10px]">
            {errorText}
          </p>
        </div>
      )}
      <Button
        onClick={() => handleSubmitClick()}
        text="Сохранить ответы"
        className={clsx("mt-[20px] w-fit text-primary", {
          inactive: isDisabled,
        })}
      />
    </div>
  );
};

export default Poll;
