"use client";
import { useModalsStore } from "@/store/modalsStore";
import CreatePollModal, {
  CreatePollModalId,
} from "../CreatePollModal/CreatePollModal";
import { useCallback, useEffect, useState } from "react";
import LoginModal, { LoginModalId } from "../LoginModal/LoginModal";

const modalHashes: string[] = [CreatePollModalId];

const GLobalModals = () => {
  const { openedModals, closeModal, openModal } = useModalsStore();
  const isOpenedModal = (modal: string) => openedModals.indexOf(modal) > -1;
  const [onStart, setOnStart] = useState(true);

  useEffect(() => {
    if (openedModals.length > 0) {
      window.location.hash = openedModals[openedModals.length - 1];
      setOnStart(false);
    } else if (!onStart) {
      window.location.hash = "";
    }
  }, [openedModals, onStart]);

  useEffect(() => {
    modalHashes.forEach((hash) => {
      if (window.location.hash.slice(1) == hash) {
        openModal(hash);
      }
    });
  }, [openModal]);

  return (
    <>
      <CreatePollModal
        show={isOpenedModal(CreatePollModalId)}
        onClose={() => closeModal(CreatePollModalId)}
      />
      <LoginModal
        show={isOpenedModal(LoginModalId)}
        onClose={() => closeModal(LoginModalId)}
      />
    </>
  );
};

export default GLobalModals;
