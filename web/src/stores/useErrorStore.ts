import { create } from "zustand";

export interface Error {
  message: string;
  show: boolean;
}

interface Store {
  error: Error;
  setError: (error: Error) => void;
}

export const useErrorStore = create<Store>((set) => ({
  error: {
    message: "",
    show: false,
  },
  setError(error) {
    set({ error });
  },
}));
