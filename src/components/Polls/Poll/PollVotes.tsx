"use client";

import { FC, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { useModalsStore } from "@/store/modalsStore";
import { LoginModalId } from "@/widgets/LoginModal/LoginModal";
import {
  cancelVotePoll,
  downvotePoll,
  fetchPollVoteCount,
  upvotePoll,
} from "../api/votePoll";

type UserVote = "up" | "down" | null;

const voteStorageKey = (pollId: string) => `poll_vote_${pollId}`;

const readStoredVote = (pollId: string): UserVote => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(voteStorageKey(pollId));
  return stored === "up" || stored === "down" ? stored : null;
};

const writeStoredVote = (pollId: string, vote: UserVote) => {
  if (typeof window === "undefined") return;
  if (vote) {
    localStorage.setItem(voteStorageKey(pollId), vote);
  } else {
    localStorage.removeItem(voteStorageKey(pollId));
  }
};

interface IPollVotesProps {
  pollId: string;
  votes: number;
  onVotesChange?: (votes: number) => void;
}

const PollVotes: FC<IPollVotesProps> = ({ pollId, votes, onVotesChange }) => {
  const { isAuthed } = useAuthStore();
  const { openModal } = useModalsStore();
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<UserVote>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(votes);
  }, [votes]);

  useEffect(() => {
    setUserVote(readStoredVote(pollId));
  }, [pollId]);

  const refreshVoteCount = useCallback(async () => {
    const count = await fetchPollVoteCount(pollId);
    setVoteCount(count);
    onVotesChange?.(count);
  }, [pollId, onVotesChange]);

  const handleUnauthorized = () => {
    openModal(LoginModalId);
  };

  const handleVoteError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      handleUnauthorized();
      return;
    }
  };

  const handleUpvote = async () => {
    if (!isAuthed) {
      handleUnauthorized();
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (userVote === "up") {
        await cancelVotePoll(pollId);
        writeStoredVote(pollId, null);
        setUserVote(null);
      } else {
        await upvotePoll(pollId);
        writeStoredVote(pollId, "up");
        setUserVote("up");
      }
      await refreshVoteCount();
    } catch (error) {
      handleVoteError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!isAuthed) {
      handleUnauthorized();
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (userVote === "down") {
        await cancelVotePoll(pollId);
        writeStoredVote(pollId, null);
        setUserVote(null);
      } else {
        await downvotePoll(pollId);
        writeStoredVote(pollId, "down");
        setUserVote("down");
      }
      await refreshVoteCount();
    } catch (error) {
      handleVoteError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx("flex items-center gap-1 rounded-xl border border-[#d4c4cf] bg-[#f7f4f6] p-1", {
        "opacity-60 pointer-events-none": isLoading,
      })}
    >
      <button
        type="button"
        aria-label="Upvote"
        onClick={handleUpvote}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors",
          userVote === "up"
            ? "bg-primary text-white"
            : "text-primary hover:bg-[#ede4ea]",
        )}
      >
        ▲
      </button>
      <span className="min-w-[28px] text-center text-sm font-semibold text-[#3d2a35]">
        {voteCount}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        onClick={handleDownvote}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors",
          userVote === "down"
            ? "bg-primary text-white"
            : "text-primary hover:bg-[#ede4ea]",
        )}
      >
        ▼
      </button>
    </div>
  );
};

export default PollVotes;
