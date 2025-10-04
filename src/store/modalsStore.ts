import { create } from 'zustand';

interface IModals {
	openedModals: string[];
	closeModal: (modal: string) => void;
	openModal: (modal: string) => void;
}

export const useModalsStore = create<IModals>()((set) => ({
	openedModals: [],
	closeModal: (el: string) =>
		set((prev) => ({ openedModals: prev.openedModals.filter((modal) => modal !== el) })),
	openModal: (el: string) =>
		set((prev) => ({ openedModals: new Set(prev.openedModals.concat([el])).values().toArray() })),
}));
