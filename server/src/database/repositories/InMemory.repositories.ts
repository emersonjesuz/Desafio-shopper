import { VehicleRepository } from "../../repositories/vehicle/Vehicle.repositories";
import { Driver, drivers } from "../inMemory/driver.database";

export class ImMemoryRepositories implements VehicleRepository {
  async list(kilometersMinute: number): Promise<Driver[]> {
    return drivers().filter(
      (driver) => driver.minimumKilometers <= kilometersMinute
    );
  }
}
