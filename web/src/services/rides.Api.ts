import { API } from "./axios";

export interface RidesSaveApiProps {
  customer_id: string;
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

export async function ridesSaveApi(body: RidesSaveApiProps) {
  return await API.patch("/ride/confirm", { ...body });
}

export async function ridesListApi(customer_id: string, driver_id?: string) {
  return await API.get(`/ride/${customer_id}?driver_id=${driver_id}`);
}
