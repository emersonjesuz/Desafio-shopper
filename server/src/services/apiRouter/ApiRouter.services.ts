interface ApiRouterServiceResponse {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  routeResponse: object;
}
export interface ApiRouterService {
  calculateRoute(
    destination: string,
    origin: string
  ): Promise<ApiRouterServiceResponse>;
}
