import { DriverEntity } from "../../domain/entities/Driver.entities";
import { ReviewCommentEnumKey } from "../../domain/entities/Review-comment.enum";
import { prisma } from "../services/prisma/Prisma.services";
import { DriversRepository } from "../../domain/repositories/Drivers.repositories";

export class PrismaDriversRepositories implements DriversRepository {
  async list(kilometersMinute: number): Promise<DriverEntity[]> {
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

    return drivers.map((driver) => {
      const review = { rating: driver.Reviews[0].rating, comment: driver.Reviews[0].comment as ReviewCommentEnumKey };
      return new DriverEntity(
        driver.id,
        driver.name,
        driver.description,
        driver.vehicle,
        driver.tax,
        driver.minimumKilometers,
        review
      );
    });
  }

  async findById(id: number): Promise<DriverEntity | null> {
    const driver = await prisma.drivers.findUnique({
      where: {
        id,
      },
      include: {
        Reviews: true,
      },
    });

    if (!driver) return null;
    const review = { rating: driver.Reviews[0].rating, comment: driver.Reviews[0].comment as ReviewCommentEnumKey };
    return new DriverEntity(
      driver.id,
      driver.name,
      driver.description,
      driver.vehicle,
      driver.tax,
      driver.minimumKilometers,
      review
    );
  }
}
