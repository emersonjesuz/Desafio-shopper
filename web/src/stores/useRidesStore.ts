import { create } from "zustand";

export interface RidesList {
  customer_id: string;
  rides: Ride[];
}

export interface Ride {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

interface Driver {
  id: number;
  name: string;
}

export interface RideData {
  origin: string;
  destination: string;
  customer_id: string;
}

interface Store {
  rideData: RideData;
  setRideData: (data: RideData) => void;
  ridesList: RidesList;
  setRidesList: (data: RidesList) => void;
}

export const useRidesStore = create<Store>((set) => ({
  rideData: { customer_id: "", origin: "", destination: "" },
  setRideData(data) {
    set({ rideData: data });
  },
  ridesList: {
    customer_id: "",
    rides: [],
  },
  setRidesList(data) {
    set({ ridesList: data });
  },
}));
