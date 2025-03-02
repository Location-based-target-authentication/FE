import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  setTokens: (
    accessToken: string,
    refreshToken: string,
    userId: number
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  userId: null,
  setTokens: (accessToken, refreshToken, userId) =>
    set({ accessToken, refreshToken, isAuthenticated: true, userId })
}));
