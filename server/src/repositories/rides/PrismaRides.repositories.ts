import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { Ride } from "../../models/Rides.models";
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

  async list(customer_id: string, driver_id?: number): Promise<Ride[]> {
    const findAll = await prisma.rides.findMany({
      where: {
        customer_id,
        ...(driver_id && { driver_id }),
      },
      include: {
        drivers: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return findAll.map((ride) => {
      return {
        ...ride,
        driver: ride.drivers,
      };
    });
  }

  async findByCustomerId(customer_id: string): Promise<Ride | null> {
    const find = await prisma.rides.findFirst({
      where: {
        customer_id,
      },
      include: {
        drivers: true,
      },
    });

    if (!find) return null;

    return {
      ...find,
      driver: find.drivers,
    };
  }
}
