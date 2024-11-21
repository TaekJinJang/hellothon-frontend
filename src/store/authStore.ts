import { create } from "zustand";

interface AuthState {
  error: string | null;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useAuthStore;
