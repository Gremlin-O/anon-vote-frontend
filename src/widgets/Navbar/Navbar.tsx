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
          "w-[100vw] h-[100vh] absolute invisible left-0 top-0 bg-black z-20 opacity-0 duration-150",
          {
            "opacity-40 visible": !isCollapsed,
          }
        )}
        onClick={() => {
          setIsCollapsed(true);
        }}
      ></div>
      {isMobile && isCollapsed && (
        <img
          src={Menu.src}
          className="fixed top-0 left-0 w-[40px] cursor-pointer duration-100 hover:scale-[1.05]"
          onClick={() => setIsCollapsed(false)}
        ></img>
      )}

      <div
        className={clsx(
          "z-10 bg-light border-[#7b1258] fixed left-0 h-[100%] flex flex-col  items-center duration-200 z-20",
          {
            "w-[80px] gap-[20px]  border-r-4": isCollapsed && !isMobile,
            "w-[180px]  gap-[20px]  border-r-4": !isCollapsed && !isMobile,
            "w-[120px]!  gap-[30px]!  border-r-4": isMobile && !isCollapsed,
            "w-[0px] border-0": isMobile && isCollapsed,
          }
        )}
      >
        <img
          src={Arrow.src}
          className={clsx(
            "absolute top-[10px] w-[40px] scale-75 scale-y-[70%] cursor-pointer duration-400",
            {
              "rotate-[180deg] scale-100 scale-y-[90%] right-[10px]":
                !isCollapsed,
              "left-[50%] translate-x-[-50%]": isCollapsed,
            }
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

        <LogoutModal
          show={logoutModal.isShown}
          onClose={logoutModal.hide}
        ></LogoutModal>
      </div>
    </>
  );
};

export default Navbar;
