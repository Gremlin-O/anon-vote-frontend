import React, { FC } from "react";
import Minus from "@/assets/images/minus.svg";
import Plus from "@/assets/images/plus.svg";
import CreatePollForm, { IAnswer, IQuestion } from "./CreatePollForm";
import { useMobile } from "@/shared/utils/useMobile";

interface IPollQuestionProps {
  answers: IAnswer[];
  question: IQuestion;
  changeQuestion: (value: string) => void;
  changeAnswer: (value: string, answerInd: number) => void;
  removeQuestion: () => void;
  removeAnswer: (answerInd: number) => void;
  addAnswer: () => void;
}

const PollQestion: FC<IPollQuestionProps> = ({
  answers,
  question,
  changeQuestion,
  changeAnswer,
  removeQuestion,
  removeAnswer,
  addAnswer,
}) => {
  const isMobile = useMobile();
  console.log(answers);
  return (
    <div className="rounded-[10px] border-bold bg-white text-primary flex flex-col gap-[10px] p-[10px] md:p-[5px]">
      <div className="flex w-full gap-[20px] items-center md:flex-col md:items-start md:gap-[5px]">
        {isMobile && (
          <div
            className="rounded-[50%] w-[30px] h-[30px] flex items-center justify-center border-3 cursor-pointer text-[40px] group hover:scale-[1.1] border-amber-500 duration-100"
            onClick={() => removeQuestion()}
          >
            <img
              src={Minus.src}
              alt=""
              className="w-[20px] group-hover:scale-[1.1] duration-100"
            />
          </div>
        )}
        <input
          value={question.text}
          onChange={(e) => changeQuestion(e.currentTarget.value)}
          type="text"
          placeholder="Введите вопрос"
          className="border-medium md:w-full bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0 flex-1 md:text-[18px] md:p-[5px]"
        />
        {!isMobile && (
          <div
            className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center border-3 cursor-pointer text-[40px] group hover:scale-[1.1] border-amber-500 duration-100"
            onClick={() => removeQuestion()}
          >
            <img
              src={Minus.src}
              alt=""
              className="w-[20px] group-hover:scale-[1.1] duration-100"
            />
          </div>
        )}
      </div>
      {answers &&
        answers.map((answer, answerInd) => {
          return (
            <div
              className="flex w-[60%] gap-[10px] items-center"
              key={answerInd}
            >
              <input
                value={answer.text}
                onChange={(e) => changeAnswer(e.currentTarget.value, answerInd)}
                type="text"
                placeholder="Введите ответ"
                className="border-medium bg-white text-primary rounded-[5px] p-[8px] text-[16px] outline-0 flex-1 md:text-[16px]"
              />
              {answers.length > 2 && (
                <div
                  className="rounded-[50%] w-[30px] h-[30px] flex items-center justify-center border-2 cursor-pointer text-[40px] group hover:scale-[1.1] border-amber-500 duration-100"
                  onClick={() => removeAnswer(answerInd)}
                >
                  <img
                    src={Minus.src}
                    alt=""
                    className="w-[16px] group-hover:scale-[1.1] duration-100"
                  />
                </div>
              )}
            </div>
          );
        })}
      <div
        className="border-2 p-[5px] border-emerald-500 w-fit rounded-[50%] mt-[5px] bg-white cursor-pointer hover:scale-[1.1] duration-150"
        onClick={() => addAnswer()}
      >
        <img src={Plus.src} alt="" className="w-[15px]" />
      </div>
    </div>
  );
};

export default PollQestion;
