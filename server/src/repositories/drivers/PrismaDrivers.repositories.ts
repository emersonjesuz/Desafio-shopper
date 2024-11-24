import { Driver } from "../../models/Driver.models";
import { prisma } from "../../services/prisma/Prisma.services";
import { DriversRepository } from "./Drivers.repositories";

export class PrismaDriversRepositories implements DriversRepository {
  async list(kilometersMinute: number): Promise<Driver[]> {
    const drivers = await prisma.drivers.findMany({
      where: {
        minimumKilometers: {
          lte: kilometersMinute,
        },
      },
      include: {
        Reviews: true,
      },
    });

    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.Reviews[0],
      tax: driver.tax,
      minimumKilometers: driver.minimumKilometers,
    }));
  }

  async findById(id: number): Promise<Driver | null> {
    const driver = await prisma.drivers.findUnique({
      where: {
        id,
      },
      include: {
        Reviews: true,
      },
    });

    if (!driver) return null;

    return {
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.Reviews[0],
      tax: driver.tax,
      minimumKilometers: driver.minimumKilometers,
    };
  }
}
