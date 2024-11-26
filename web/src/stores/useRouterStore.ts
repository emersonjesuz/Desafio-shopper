import { create } from "zustand";
export type Router = "estimate" | "drivers" | "rides";

interface Store {
  router: Router;
  setRouter: (route: Router) => void;
}

export const useRouterStore = create<Store>((set) => ({
  router: "estimate",
  setRouter(route) {
    set({ router: route });
  },
}));
