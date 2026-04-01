import { useEffect } from "react";
import { axiosInstance } from "../../../api";
import { useModalsStore } from "@/store/modalsStore";
import { useAuthStore } from "@/store/authStore";
import { LoginModalId } from "@/widgets/LoginModal/LoginModal";

export const useFetchMe = () => {
  const { setIsAuthed } = useAuthStore();
  const { openModal } = useModalsStore();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        await axiosInstance.get("/auth/me");
        setIsAuthed(true);
      } catch (error) {
        openModal(LoginModalId);
        setIsAuthed(false);
      }
    };
    fetchMe();
  }, [openModal, setIsAuthed]);
};
