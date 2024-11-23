import { NextFunction, Request, Response } from "express";
import { EstimateCreateDto } from "../../dtos/EstimateCreate.dtos";
import { BadRequestError } from "../../helpers/Api-error";

export class EstimateCreateMiddlewares {
  public async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { customer_id, destination, origin } =
      request.body as unknown as EstimateCreateDto;

    const statusMessage = "INVALID_DATA";

    if (!customer_id)
      throw new BadRequestError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        statusMessage
      );

    if (!destination && !origin)
      throw new BadRequestError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        statusMessage
      );

    if (destination === origin)
      throw new BadRequestError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        statusMessage
      );

    next();
  }
}
