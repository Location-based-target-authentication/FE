import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  userId: number;
  setUserId: (userId: number) => void;
  setPoint: (point: number) => void;
  addPoint: (addPoint: number) => void;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "",
  point: 0,
  userId: 0,
  setUserId: (userId) => set({ userId }),
  setPoint: (point) => set({ point }),
  addPoint: (addPoint: number) =>
    set((state) => ({ point: state.point + addPoint })),
  setUserName: (userName) => set({ userName })
}));
