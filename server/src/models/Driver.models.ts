export interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  tax: number;
  minimumKilometers: number;
}

interface Review {
  rating: number;
  comment: string;
}
