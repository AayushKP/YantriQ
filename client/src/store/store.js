import { create } from "zustand";

export const useStore = create((set) => ({
  user: null, // Initial user state
  setUser: (newUser) => set({ user: newUser }),
}));
