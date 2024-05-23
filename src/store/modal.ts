import { create } from "zustand";

interface ModalState {
    visible: boolean,
    setVisible(visible: boolean): void;
}

export const useModalStore = create<ModalState>((set) => ({
    visible: false,
    setVisible(visible) {
        set({ visible });
    },
}));
