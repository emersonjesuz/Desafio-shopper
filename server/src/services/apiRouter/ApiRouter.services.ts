interface RouteResponse {
  routes: Route[];
}

interface Route {
  distanceMeters: number;
  duration: string;
  polyline: EncodedPolyline;
}

interface EncodedPolyline {
  encodedPolyline: string;
}
export interface ApiRouterService {
  calculateRoute(destination: string, origin: string): Promise<RouteResponse>;
}
