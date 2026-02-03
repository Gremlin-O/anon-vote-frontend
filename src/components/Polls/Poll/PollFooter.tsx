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

interface IPollFooterProps {
  onClick: () => void;
  isDisabled: boolean;
  toggleStats: () => void;
  canToggleStats: boolean;
  id: string;
}

const PollFooter: FC<IPollFooterProps> = ({
  onClick,
  id,
  isDisabled,
  toggleStats,
  canToggleStats,
}) => {
  const router = useRouter();
  const sharingModal = useModal("sharing-modal");
  return (
    <>
      <div className="flex justify-between items-center mt-[20px] ">
        <Button
          onClick={() => onClick()}
          text="Сохранить ответы"
          className={clsx("w-fit text-primary md:p-[5px]", {
            inactive: isDisabled,
          })}
        />
        <div className="flex gap-[15px] flex-wrap justify-center md:gap-[5px]">
          {canToggleStats && (
            <img
              src={statistics.src}
              alt=""
              className="w-[50px] cursor-pointer duration-100 hover:scale-[1.1] md:w-[40px]"
              onClick={() => toggleStats()}
            />
          )}
          {canToggleStats && (
            <img
              src={sophisticatedStatistics.src}
              alt=""
              className="w-[40px] cursor-pointer duration-100 hover:scale-[1.1] md:w-[35px]"
              onClick={() => router.push(`/sophisticated-stats/${id}`)}
            />
          )}
          <img
            src={share.src}
            alt=""
            className="w-[40px] cursor-pointer duration-100 hover:scale-[1.1] md:w-[35px]"
            onClick={() => sharingModal.show()}
          />
          <img
            src={telegram.src}
            alt=""
            className="w-[40px] cursor-pointer duration-100 hover:scale-[1.1] md:w-[35px]"
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
