import { Response, Request } from "express";
import { ApiRouterService } from "../services/apiRouter/ApiRouter.services";

export class EstimateController {
  constructor(private readonly apiRouterService: ApiRouterService) {}
  public async create(request: Request, response: Response): Promise<void> {
    const routes = await this.apiRouterService.calculateRoute(
      "macurure",
      "salvador"
    );
    response.status(200).json({
      routes,
    });
  }
}
