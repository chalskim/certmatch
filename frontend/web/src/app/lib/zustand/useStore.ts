import { create } from 'zustand';

interface AppState {
  // Define your state here
  count: number;
  // Define your actions here
  increment: () => void;
  decrement: () => void;
}

export const useStore = create<AppState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));