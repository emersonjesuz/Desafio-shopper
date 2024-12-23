interface Driver {
  id: number;
  name: string;
}
export interface RidesCreateDto {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}
