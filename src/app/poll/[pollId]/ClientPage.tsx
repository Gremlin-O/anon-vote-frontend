"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchPoll } from "../api/fetchPoll";
import Poll from "@/components/Polls/Poll/Poll";
import clsx from "clsx";
import { IPoll } from "@/components/Polls/api/models";
import { axiosInstance } from "../../../../api";
import { useAuthStore } from "@/store/authStore";
import { useModalsStore } from "@/store/modalsStore";
import { LoginModalId } from "@/widgets/LoginModal/LoginModal";
import { useFetchMe } from "@/app/api/useFetchMe";

export const ClientPage = () => {
  const params = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<IPoll>();

  useEffect(() => {
    fetchPoll(params.pollId).then((poll) => {
      setPoll(poll);
    });
  }, [setPoll, params.pollId]);
  useFetchMe();
  return (
    <div
      className={clsx(
        " max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]! md:mr-[10px]",
      )}
    >
      <h1 className="page-title mb-5">Опрос</h1>
      {poll !== undefined ? (
        <Poll
          id={poll?.id}
          title={poll?.title}
          tags={poll.tags}
          category={poll.category}
          queries={poll.queries}
          backIsAnswered={poll.isAnswered}
          votes={poll.votes}
          onVotesChange={(votes) => {
            setPoll((prev) => (prev ? { ...prev, votes } : prev));
          }}
        ></Poll>
      ) : (
        <></>
      )}
    </div>
  );
};
