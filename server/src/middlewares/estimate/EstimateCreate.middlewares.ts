import { NextFunction } from "express";
import { EstimateCreateDto } from "../../dtos/EstimateCreate.dtos";
import { BadRequestError } from "../../helpers/Api-error";

export class EstimateCreateMiddlewares {
  public static async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { customer_id, destination, origin } =
      request.body as unknown as EstimateCreateDto;

    const statusMessage = "INVALID_DATA";

    if (!customer_id)
      throw new BadRequestError(
        "O id do usuário não pode estar em branco.",
        statusMessage
      );

    if (!destination && !origin)
      throw new BadRequestError(
        "O destino ou o origem podem estar em branco.",
        statusMessage
      );

    if (destination === origin)
      throw new BadRequestError(
        "Os endereços de origem e destino não podem ser o mesmo endereço.",
        statusMessage
      );

    next();
  }
}
