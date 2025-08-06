import { ApiRouterService, ApiRouterServiceResponse } from "./ApiRouter.service";

export class ApiRouterMockService implements ApiRouterService {
  calculateRoute(destination: string, origin: string): Promise<ApiRouterServiceResponse> {
    return Promise.resolve({
      destination: { latitude: 0, longitude: 0 },
      distance: 0,
      duration: "",
      origin: { latitude: 0, longitude: 0 },
      routeResponse: {},
    } as ApiRouterServiceResponse);
  }
}
