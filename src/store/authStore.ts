import { create } from "zustand";

interface IAuth {
  isAuthed: boolean;
  setIsAuthed: (el: boolean) => void;
}

export const useAuthStore = create<IAuth>()((set) => ({
  isAuthed: false,
  setIsAuthed: (el) => set(() => ({ isAuthed: el })),
}));
