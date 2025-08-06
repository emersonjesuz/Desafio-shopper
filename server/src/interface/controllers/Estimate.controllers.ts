import { EstimateCreateResponseDTO } from "../../application/dtos/EstimateCreateResponse.dtos";
import { EstimateUseCases } from "../../application/useCases/Estimate.useCases";
import { DistanceFormatterKilometersMinute } from "../../domain/entities/DistanceFormatterKilometersMinute.utils";
import { TimeFormatterMinuteOrHours } from "../../domain/entities/TimeFormatterMinuteOrHours.utils";
import { ApiRouterService } from "../../infra/services/apiRouter/ApiRouter.service";
import { IHttpController } from "../http/IHttpController";
import { IHttpServer } from "../http/IHttpServer";

export class EstimateController implements IHttpController {
  constructor(private readonly apiRouterService: ApiRouterService, private readonly estimateCreateUseCases: EstimateUseCases) {}
  registerRoutes(httpServer: IHttpServer): void {
    httpServer.register("post", "/ride/estimate", async (body) => {
      const { origin, destination } = body;
      const data = await this.apiRouterService.calculateRoute(origin, destination);
      const distanceFormatterKilometersMinute = new DistanceFormatterKilometersMinute();
      const kilometer = distanceFormatterKilometersMinute.format(data.distance);
      const timeFormatterMinuteOrHours = new TimeFormatterMinuteOrHours();
      const drivers = await this.estimateCreateUseCases.list(kilometer, "asc");
      const output: EstimateCreateResponseDTO = {
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: timeFormatterMinuteOrHours.format(data.duration),
        options: drivers,
        routeResponse: data.routeResponse,
      };

      return { ...output };
    });
  }
}
