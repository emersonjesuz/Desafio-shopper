import { Response, Request } from "express";
import { ApiRouterService } from "../services/apiRouter/ApiRouter.services";
import { EstimateUseCases } from "../useCases/Estimate.useCases";
import { ImMemoryRepositories } from "../database/repositories/InMemory.repositories";
import { DistanceFormatterKilometersMinute } from "../utils/distanceFormatter/DistanceFormatterkilometersMinute.utils";
import { EstimateCreateResponseDTO } from "../dtos/EstimateCreateResponse.dtos";
import { TimeFormatterMinuteOrHours } from "../utils/timeFormatter.ts/TimeFormatterMinuteOrHours.utils";

export class EstimateController {
  private estimateCreateUseCases = new EstimateUseCases(
    new ImMemoryRepositories()
  );
  constructor(private readonly apiRouterService: ApiRouterService) {}
  public async create(request: Request, response: Response): Promise<void> {
    const { origin, destination } = request.body;

    const data = await this.apiRouterService.calculateRoute(
      origin,
      destination
    );

    const distanceFormatterKilometersMinute =
      new DistanceFormatterKilometersMinute();
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

    response.status(200).json({ ...output });
  }
}
