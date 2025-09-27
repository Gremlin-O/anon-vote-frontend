"use client";
import React, { useEffect, useRef, useState } from "react";
import { IPoll, usePolls } from "./api/usePolls";
import Poll from "./Poll/Poll";
import Search from "../Search/Search";
import { searchPolls } from "./api/searchPolls";

const polls: IPoll[] = [
  {
    title: "Тест",
    queries: [
      {
        id: "123",
        text: "Почему?",
        answers: [
          { response: "Тест1", id: "0" },
          { response: "Тест2", id: "0" },
        ],
      },
      {
        id: "123",
        text: "Сколько?",
        answers: [
          { response: "Тест1", id: "0" },
          { response: "Тест2", id: "0" },
        ],
      },
    ],
    id: "1",
    tags: ["Тренды", "Философия"],
  },
  {
    title: "Тест",
    queries: [
      {
        id: "123",
        text: "Почему?",
        answers: [
          { response: "Тест1", id: "0" },
          { response: "Тест2", id: "0" },
        ],
      },
      {
        id: "123",
        text: "Сколько?",
        answers: [
          { response: "Тест1", id: "0" },
          { response: "Тест2", id: "0" },
        ],
      },
    ],
    id: "2",
    tags: ["Тренды", "Философия"],
  },
];

polls.forEach((poll, i1) => {
  poll.queries.forEach((q, i2) => {
    q.id = i1.toString() + i2.toString();
    q.answers.forEach((ans, i3) => (ans.id = Date.now() + "-" + ans.response));
  });
  poll.id = i1.toString();
});

const Polls = () => {
  // const polls = usePolls();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answers =
    useState<Record<string, { response: string; isChosen: boolean }[]>[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const data = await searchPolls(searchValue);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchValue]);
  const handleSubmitClick = () => {};
  return (
    <>
      <Search
        value={searchValue}
        onChangeValue={setSearchValue}
        className="ml-0! w-[60%]! md:w-full! "
      />
      <div className=" rounded-[20px] box-border mt-[20px] flex flex-col max-h-full gap-[20px] overflow-auto flex-1 scrollbar-hide">
        {polls?.map((poll, pollInd) => {
          return (
            <Poll
              id={poll.id}
              onSubmit={handleSubmitClick}
              key={poll.id}
              title={poll.title}
              tags={poll.tags}
              queries={poll.queries}
            ></Poll>
          );
        })}
      </div>
    </>
  );
};

export default Polls;
