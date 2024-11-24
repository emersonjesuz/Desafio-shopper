export interface RidesListResponseDto {
  customer_id: string;
  rides: RideResponse[];
}

export interface RideResponse {
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
