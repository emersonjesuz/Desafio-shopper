export interface ApiRouterService {
  calculateRoute(destination: string, origin: string): Promise<any>;
}
