import { IHttpServer } from "./IHttpServer";

export interface IHttpController {
  registerRoutes(httpServer: IHttpServer): void;
}
