import { Request, Response } from "express";
import { RidesCreateDto } from "../dtos/RidesCreateDto.dtos";
import { RidesUseCases } from "../useCases/rides/Rides.useCases";
import { PrismaRidesRepository } from "../repositories/rides/PrismaRides.repositories";
import { PrismaDriversRepositories } from "../repositories/drivers/PrismaDrivers.repositories";
export class RidesController {
  private readonly ridesUseCases = new RidesUseCases(
    new PrismaRidesRepository(),
    new PrismaDriversRepositories()
  );
  async save(request: Request, response: Response): Promise<void> {
    const {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    } = request.body as unknown as RidesCreateDto;

    const save = await this.ridesUseCases.create({
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    });

    response.status(200).json({ success: save });
  }

  async list(request: Request, response: Response): Promise<void> {
    const { customer_id } = request.params;
    const { driver_id } = request.query;
    const rides = await this.ridesUseCases.list(customer_id, Number(driver_id));
    response.status(200).json({ ...rides });
  }
}
