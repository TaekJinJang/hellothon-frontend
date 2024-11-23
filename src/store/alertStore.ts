import { create } from "zustand";

interface AlertState {
  message: string | null;
  type: "error" | "success" | null;
  setAlert: (message: string | null, type: "error" | "success" | null) => void;
}

const useAlertStore = create<AlertState>((set) => ({
  message: null,
  type: null,
  setAlert: (message, type) => set({ message, type }),
}));

export default useAlertStore;
