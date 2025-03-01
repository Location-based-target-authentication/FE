import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  setPoint: (point: number) => void;
  addPoint: (addPoint: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "park",
  point: 100000,
  setPoint: (point) => set({ point }),
  addPoint: (addPoint: number) =>
    set((state) => ({ point: state.point + addPoint }))
}));
