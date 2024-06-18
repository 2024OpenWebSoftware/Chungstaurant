import { create } from "zustand";

interface ModalState {
    visible: boolean,
    clicked: boolean[],
    setVisible(visible: boolean): void;
    setClicked(clicked: boolean[]): void;
    resetClicked(): void;
}

export const useModalStore = create<ModalState>((set) => ({
    visible: false,
    clicked: [false, false, false, false, false],
    setVisible(visible) {
        set({ visible });
    },
    setClicked(clicked) {
        set({clicked});
    },
    resetClicked() {
        set({
            clicked: [false, false, false, false, false],
        })
    }
}));
