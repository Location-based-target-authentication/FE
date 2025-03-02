import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  userId: number | null;
  socialId: number | null;
  setTokens: (
    accessToken: string,
    refreshToken: string,
    userId: number
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  socialId: null,
  userId: null,
  setTokens: (accessToken, refreshToken, userId) =>
    set({ accessToken, refreshToken, isAuthenticated: true, userId }),
  logout: () => set({ isAuthenticated: false })
}));
