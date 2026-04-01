"use client";
import Polls from "@/components/Polls/Polls";
import { useMobile } from "@/shared/utils/useMobile";
import { useModalsStore } from "@/store/modalsStore";
import { LoginModalId } from "@/widgets/LoginModal/LoginModal";
import clsx from "clsx";
import { useEffect } from "react";
import { axiosInstance } from "../../api";
import { useAuthStore } from "@/store/authStore";
import { useFetchMe } from "./api/useFetchMe";

export default function Home() {
  const isMobile = useMobile();
  const { openModal } = useModalsStore();
  const { setIsAuthed } = useAuthStore();
  useFetchMe();
  return (
    <div
      className={clsx(
        "mr-[10px] relative max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px]",
        {
          "ml-[40px]!": isMobile,
        },
      )}
    >
      <Polls></Polls>
    </div>
  );
}
