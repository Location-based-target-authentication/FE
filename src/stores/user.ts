import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  userId: string;
  setPoint: (point: number) => void;
  addPoint: (addPoint: number) => void;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "park",
  point: 100000,
  userId: "0",
  setPoint: (point) => set({ point }),
  addPoint: (addPoint: number) =>
    set((state) => ({ point: state.point + addPoint })),
  setUserName: (userName) => set({ userName })
}));
