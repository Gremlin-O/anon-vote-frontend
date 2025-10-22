import React, { FC, useEffect, useRef, useState } from "react";
import Minus from "@/assets/images/minus.svg";
import Plus from "@/assets/images/plus.svg";
import SelectCategory from "./SelectCategory/SelectCategory";
import PollAnswer from "./PollQestion";
import PollQestion from "./PollQestion";
import Button from "@/components/Button/Button";
import { createPoll } from "./createPoll";
import TagsInput from "./TagsInput/TagsInput";
import { ICategory } from "./SelectCategory/fetchCategoriesByName";
import { useRouter } from "next/navigation";
import { useModalsStore } from "@/store/modalsStore";
import CreatePollModal, { CreatePollModalId } from "./CreatePollModal";
import { Controller, Message, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { LoginModalId } from "../LoginModal/LoginModal";

export interface IAnswer {
  text: string;
}

export interface IQuestion {
  text: string;
  answers: IAnswer[];
}

export interface IPoll {
  name: string;
  questions: IQuestion[];
  tags: string[];
  category?: ICategory;
}

const initialPoll: IPoll = {
  name: "",
  questions: [
    {
      text: "",
      answers: [{ text: "" }, { text: "" }],
    },
  ],
  tags: [],
};
const CreatePollForm: FC<{ onSubmit: () => void }> = ({
  onSubmit: onFormSubmit,
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<IPoll>({
    defaultValues: initialPoll,
  });
  const { openModal } = useModalsStore();
  const questionsContRef = useRef<HTMLDivElement>(null);
  const onSubmit: SubmitHandler<IPoll> = async (data) => {
    try {
      await createPoll(data);
      onFormSubmit();
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          openModal(LoginModalId);
        }
      }
    }
  };

  return (
    <div
      className="h-full overflow-auto scrollbar-hide scroll-smooth"
      ref={questionsContRef}
    >
      <form
        className="flex flex-col h-full min-h-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-[32px] mb-[40px] text-primary md:text-[28px]">
          Создайте свой опрос
        </h1>
        <input
          type="text"
          placeholder="Введите название опроса"
          className="border-medium bg-white text-primary rounded-[5px] p-[10px] text-[20px] outline-0  mb-[20px]"
          {...register("name", {
            required: "Название обязательно",
            minLength: {
              value: 5,
              message: "Минимальная длина 5 символов",
            },
            maxLength: {
              value: 100,
              message: "Максимальная длина 100 символов",
            },
          })}
        />
        {errors["name"] && (
          <p className="text-red-500 -mt-[15px] mb-[5px]">
            {errors["name"].message}
          </p>
        )}
        <Controller
          name={"category"}
          control={control}
          rules={{
            required: "Категория обязательна",
          }}
          render={({ field, fieldState }) => (
            <>
              <SelectCategory
                onChange={(category) => {
                  field.onChange(category);
                }}
                value={field.value}
              />
              {fieldState.error && (
                <p className="text-red-500 -mt-[15px] mb-[5px]">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name={"tags"}
          control={control}
          rules={{}}
          render={({ field, fieldState }) => (
            <>
              <TagsInput
                tags={field.value}
                tagsChange={(tags) => field.onChange(tags)}
                {...register("tags")}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name={"questions"}
          control={control}
          rules={{
            validate: (questions): Message => {
              const errors: string[] = [];
              if (questions.length < 1)
                errors.push("должен быть хотя бы 1 вопрос");
              if (questions.some((q) => q.answers.some((a) => !a.text)))
                errors.push("не должно быть пустых ответов");
              if (questions.some((q) => !q.text))
                errors.push("не должно быть пустых вопросов");

              return errors[0];
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-[20px] bg-secondary">
                {field.value.map((question, questionInd) => {
                  return (
                    <PollQestion
                      key={questionInd}
                      answers={question.answers}
                      question={question}
                      changeQuestion={(value) =>
                        field.onChange(
                          field.value.map((q, i) => {
                            if (i != questionInd) return q;
                            return {
                              ...q,
                              text: value,
                            };
                          })
                        )
                      }
                      changeAnswer={(value, answerInd) =>
                        field.onChange(
                          field.value.map((q, i) => {
                            if (i != questionInd) return q;
                            return {
                              ...q,
                              answers: q.answers.map((a, aI) => {
                                if (aI !== answerInd) return a;
                                return {
                                  ...a,
                                  text: value,
                                };
                              }),
                            };
                          })
                        )
                      }
                      removeQuestion={() =>
                        field.onChange(
                          field.value.filter((q, i) => i !== questionInd)
                        )
                      }
                      removeAnswer={(answerInd) =>
                        field.onChange(
                          field.value.map((question, qIndex) => {
                            if (qIndex !== questionInd) return question;

                            return {
                              ...question,
                              answers: question.answers.filter(
                                (answer, aIndex) => aIndex !== answerInd
                              ),
                            };
                          })
                        )
                      }
                      addAnswer={() =>
                        field.onChange(
                          field.value.map((q, i) => {
                            if (i !== questionInd) return q;
                            return {
                              ...q,
                              answers: q.answers.concat({ text: "" }),
                            };
                          })
                        )
                      }
                    />
                  );
                })}
              </div>
            </>
          )}
        />
        <div
          className="ml-[10px] border-3 p-[5px] border-emerald-500 w-fit rounded-[50%] mt-[20px] bg-white cursor-pointer hover:scale-[1.1] duration-150"
          onClick={() =>
            setValue(
              "questions",
              getValues("questions").concat({
                text: "",
                answers: [{ text: "" }, { text: "" }],
              })
            )
          }
        >
          <img src={Plus.src} alt="" className="w-[30px]" />
        </div>
        {getFieldState("questions").error?.message && (
          <p className="text-red-500 mt-[5px] mb-[5px]">
            {getFieldState("questions").error?.message}
          </p>
        )}
        <Button
          type="submit"
          text="Создать опрос"
          className="fixed right-[20px] bottom-[20px] md:left-[10px] md:bottom-[10px]"
        />
      </form>
    </div>
  );
};

export default CreatePollForm;
