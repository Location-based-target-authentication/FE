import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  setPoint: (point: number) => void;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "park",
  point: 100000,
  setPoint: (point) => set({ point }),
  setUserName: (userName) => set({ userName })
}));
