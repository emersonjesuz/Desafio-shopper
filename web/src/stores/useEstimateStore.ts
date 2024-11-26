import { create } from "zustand";

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

interface Review {
  rating: number;
  comment: string;
}

interface Origin {
  latitude: number;
  longitude: number;
}
interface Destination {
  latitude: number;
  longitude: number;
}
export interface Estimate {
  origin: Origin;
  destination: Destination;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: object;
}

const initializedEstimate: Estimate = {
  origin: {
    latitude: -23.55052,
    longitude: -46.633308,
  },
  destination: {
    latitude: -22.909938,
    longitude: -47.062633,
  },
  distance: 0,
  duration: "",
  options: [],
  routeResponse: {},
};

interface Store {
  estimate: Estimate;
  setEstimate: (estimate: Estimate) => void;
}

export const useEstimateStore = create<Store>((set) => ({
  estimate: { ...initializedEstimate },
  setEstimate: (estimate) => set({ estimate }),
}));
