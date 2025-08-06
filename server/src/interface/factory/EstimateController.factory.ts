import { EstimateUseCases } from "../../application/useCases/Estimate.useCases";
import { PrismaDriversRepositories } from "../../infra/repositories/PrismaDrivers.repositories";
import { GoogleApiRouterService } from "../../infra/services/apiRouter/GoogleApiRouter.service";
import { EstimateController } from "../controllers/Estimate.controllers";
import { IHttpServer } from "../http/IHttpServer";

export class EstimateControllerFactory {
  static registerRoutes(server: IHttpServer) {
    const driversRepository = new PrismaDriversRepositories();
    const estimateUseCase = new EstimateUseCases(driversRepository);
    const apiRouter = new GoogleApiRouterService();
    return new EstimateController(apiRouter, estimateUseCase).registerRoutes(server);
  }
}
