import { Request, Response, NextFunction } from "express";
import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { BadRequestError } from "../../helpers/Api-error";
export class RidesCreateMiddleware {
  public async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    } = request.body as unknown as RidesCreateDto;

    const responseMessage =
      "Os dados fornecidos no corpo da requisição são inválidos";
    const errorCode = "INVALID_DATA";

    if (!customer_id || !customer_id.trim()) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (!destination || !origin) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (destination === origin) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (distance <= 0) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (!duration || !duration.trim()) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (value <= 0) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    if (!driver.id || !driver.name.trim()) {
      throw new BadRequestError(responseMessage, errorCode);
    }

    next();
  }
}
