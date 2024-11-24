import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { prisma } from "../../services/prisma/Prisma.services";
import { RidesRepository } from "./Rides.repositories";

export class PrismaRidesRepository implements RidesRepository {
  async create(ridesCreateDto: RidesCreateDto): Promise<boolean> {
    const save = await prisma.rides.create({
      data: {
        customer_id: ridesCreateDto.customer_id,
        origin: ridesCreateDto.origin,
        destination: ridesCreateDto.destination,
        distance: ridesCreateDto.distance,
        duration: ridesCreateDto.duration,
        driver_id: ridesCreateDto.driver.id,
        value: ridesCreateDto.value,
        date: new Date(),
      },
    });
    return !!save;
  }
}
