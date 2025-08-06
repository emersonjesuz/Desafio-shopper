import { DriverEntity } from "../../../domain/entities/Driver.entities";
import { ReviewCommentEnumKey } from "../../../domain/entities/Review-comment.enum";
import { DriversRepository } from "../../../domain/repositories/Drivers.repositories";
import { drivers } from "../inMemory/driver.database";

export class ImMemoryRepositories implements DriversRepository {
  async list(kilometersMinute: number): Promise<DriverEntity[]> {
    return drivers()
      .map(
        (driver) =>
          new DriverEntity(driver.id, driver.name, driver.description, driver.vehicle, driver.tax, driver.minimumKilometers, {
            ...driver.review,
            comment: driver.review.comment as ReviewCommentEnumKey,
          })
      )
      .filter((driver) => driver.toJson().minimumKilometers <= kilometersMinute);
  }

  async findById(id: number): Promise<DriverEntity | null> {
    return (
      drivers()
        .map(
          (driver) =>
            new DriverEntity(driver.id, driver.name, driver.description, driver.vehicle, driver.tax, driver.minimumKilometers, {
              ...driver.review,
              comment: driver.review.comment as ReviewCommentEnumKey,
            })
        )
        .find((driver) => driver.toJson().id === id) || null
    );
  }
}
