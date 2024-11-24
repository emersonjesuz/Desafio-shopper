export interface Ride {
  customer_id: string;
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
