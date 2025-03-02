import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  userId: string;
  setUserId: (userId: string) => void;
  setPoint: (point: number) => void;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "park",
  point: 100000,
  userId: "0",
  setUserId: (userId) => set({ userId }),
  setPoint: (point) => set({ point }),
  setUserName: (userName) => set({ userName })
}));
