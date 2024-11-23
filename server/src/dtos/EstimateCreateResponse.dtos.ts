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
export interface EstimateCreateResponseDTO {
  origin: Origin;
  destination: Destination;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: object;
}
