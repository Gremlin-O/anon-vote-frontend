"use client";
import Enter from "@/assets/images/enter.svg";
import Exit from "@/assets/images/exit.svg";
import Home from "@/assets/images/home.svg";
import Profile from "@/assets/images/profile.svg";
import Plus from "@/assets/images/plus.svg";
import List from "@/assets/images/list.svg";
import Arrow from "@/assets/images/arrow.svg";
import Menu from "@/assets/images/menu.svg";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useModal } from "../Modal/useModal";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import { useMobile } from "@/shared/utils/useMobile";
import CreatePollModal, {
  CreatePollModalId,
} from "../CreatePollModal/CreatePollModal";
import NavButton from "./NavButton/NavButton";
import LoginModal, { LoginModalId } from "../LoginModal/LoginModal";
import { useModalsStore } from "@/store/modalsStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import LogoutModal from "../LogoutModal/LogoutModal";
import TelegramImg from "@/assets/images/telegram.svg";
import Button from "@/components/Button/Button";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const logoutModal = useModal("logout-modal");
  const { openModal } = useModalsStore();
  const router = useRouter();
  const { isAuthed } = useAuthStore();
  const linkHome = () => {
    router.push("/");
  };
  const isMobile = useMobile();
  return (
    <>
      <div
        className={clsx(
          "w-[100vw] h-[100vh] absolute invisible left-0 top-0 bg-black/50 backdrop-blur-[2px] z-20 opacity-0 duration-200",
          {
            "opacity-100 visible": !isCollapsed,
          },
        )}
        onClick={() => {
          setIsCollapsed(true);
        }}
      ></div>
      {isMobile && isCollapsed && (
        <button
          type="button"
          className="fixed top-3 left-3 w-[40px] h-[40px] cursor-pointer duration-200 hover:scale-105 flex items-center justify-center rounded-xl bg-white border border-[#ddd6db] shadow-card z-30"
          onClick={() => setIsCollapsed(false)}
        >
          <img src={Menu.src} alt="" className="w-[22px]" />
        </button>
      )}

      <div
        className={clsx(
          "z-10 glass-sidebar fixed left-0 h-[100%] flex flex-col items-center duration-300 z-20",
          {
            "w-[80px] gap-[16px]": isCollapsed && !isMobile,
            "w-[180px] gap-[16px]": !isCollapsed && !isMobile,
            "w-[120px]! gap-[24px]!": isMobile && !isCollapsed,
            "w-[0px] border-0 shadow-none": isMobile && isCollapsed,
          },
        )}
      >
        <img
          src={Arrow.src}
          className={clsx(
            "absolute top-[14px] w-[28px] opacity-40 cursor-pointer duration-300 hover:opacity-80",
            {
              "rotate-[180deg] right-[14px]": !isCollapsed,
              "left-[50%] translate-x-[-50%]": isCollapsed,
            },
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
        <NavButton
          text="Домой"
          src={Home.src}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onClick={() => {
            setIsCollapsed(true);
            linkHome();
          }}
          className="mt-[70px]"
        />

        <NavButton
          text="Создать опрос"
          src={Plus.src}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onClick={() => {
            if (isAuthed) {
              setIsCollapsed(true);
              openModal(CreatePollModalId);
            } else {
              setIsCollapsed(true);
              openModal(LoginModalId);
            }
          }}
        />
        {/* <NavButton
          text="Профиль"
          src={Profile.src}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onClick={() => {
            setIsCollapsed(true);
            openModal(CreatePollModalId);
          }}
        /> */}
        {isAuthed ? (
          <NavButton
            text="Выйти"
            src={Exit.src}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            onClick={() => {
              setIsCollapsed(true);
              logoutModal.toggle();
            }}
          />
        ) : (
          <NavButton
            text="Войти"
            src={Enter.src}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            onClick={() => {
              setIsCollapsed(true);
              openModal(LoginModalId);
            }}
          />
        )}
        <NavButton
          text="ТГ бот"
          src={TelegramImg.src}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onClick={() => {
            window.open(`https://t.me/anon_vote_ru_bot`, "_blank");
          }}
        />

        <LogoutModal
          show={logoutModal.isShown}
          onClose={logoutModal.hide}
        ></LogoutModal>
      </div>
    </>
  );
};

export default Navbar;
