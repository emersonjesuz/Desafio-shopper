import { Driver } from "../../database/inMemory/driver.database";

export interface VehicleRepository {
  list(kilometersMinute: number): Promise<Driver[]>;
}
