import { create } from "zustand";

interface UserState {
  userName: string;
  point: number;
  userId: number;
  setUserId: (userId: number) => void;
  setPoint: (point: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "",
  point: 0,
  userId: 0,
  setUserId: (userId) => set({ userId }),
  setPoint: (point) => set({ point })
}));
