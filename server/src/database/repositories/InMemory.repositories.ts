import { Driver } from "../../models/Driver.models";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { drivers } from "../inMemory/driver.database";

export class ImMemoryRepositories implements DriversRepository {
  async list(kilometersMinute: number): Promise<Driver[]> {
    return drivers().filter(
      (driver) => driver.minimumKilometers <= kilometersMinute
    );
  }

  async findById(id: number): Promise<Driver | null> {
    return drivers().find((driver) => driver.id === id) || null;
  }
}
