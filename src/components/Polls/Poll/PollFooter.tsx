import Button from "@/components/Button/Button";
import clsx from "clsx";
import React, { FC } from "react";
import statistics from "@/assets/images/statistics.svg";
import sophisticatedStatistics from "@/assets/images/sophisticated-statistics.svg";
import share from "@/assets/images/share.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModal } from "@/widgets/Modal/useModal";
import SharingLinkModal from "@/widgets/SharingLinkModal/SharingLinkModal";
import telegram from "@/assets/images/telegram.svg";
import PollVotes from "./PollVotes";

interface IPollFooterProps {
  onClick: () => void;
  isDisabled: boolean;
  toggleStats: () => void;
  canToggleStats: boolean;
  id: string;
  votes: number;
  onVotesChange?: (votes: number) => void;
}

const PollFooter: FC<IPollFooterProps> = ({
  onClick,
  id,
  isDisabled,
  toggleStats,
  canToggleStats,
  votes,
  onVotesChange,
}) => {
  const router = useRouter();
  const sharingModal = useModal("sharing-modal");
  return (
    <>
      <div className="flex justify-between items-center mt-[20px] pt-3 border-t border-[#d4c4cf]">
        <div className="flex items-center gap-3 flex-wrap">
          <PollVotes pollId={id} votes={votes} onVotesChange={onVotesChange} />
          <Button
            onClick={() => onClick()}
            text="Сохранить ответы"
            className={clsx("btn-filled w-fit md:px-3 md:py-1.5", {
              inactive: isDisabled,
            })}
          />
        </div>
        <div className="flex gap-[12px] flex-wrap justify-center md:gap-[8px]">
          {canToggleStats && (
            <img
              src={statistics.src}
              alt=""
              className="w-[40px] cursor-pointer duration-200 hover:scale-110 md:w-[36px]"
              onClick={() => toggleStats()}
            />
          )}
          {canToggleStats && (
            <img
              src={sophisticatedStatistics.src}
              alt=""
              className="w-[36px] cursor-pointer duration-200 hover:scale-110 md:w-[32px]"
              onClick={() => router.push(`/sophisticated-stats/${id}`)}
            />
          )}
          <img
            src={share.src}
            alt=""
            className="w-[36px] cursor-pointer duration-200 hover:scale-110 md:w-[32px]"
            onClick={() => sharingModal.show()}
          />
          <img
            src={telegram.src}
            alt=""
            className="w-[36px] cursor-pointer duration-200 hover:scale-110 md:w-[32px]"
            onClick={() =>
              window.open(
                `https://t.me/anon_vote_ru_bot?start=poll_${id}`,
                "_blank",
              )
            }
          />
        </div>
      </div>

      <SharingLinkModal
        show={sharingModal.isShown}
        onClose={() => sharingModal.hide()}
        pollId={id}
      />
    </>
  );
};

export default PollFooter;
