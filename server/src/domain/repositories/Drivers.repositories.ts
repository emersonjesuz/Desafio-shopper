import { DriverEntity } from "../entities/Driver.entities";

export interface DriversRepository {
  list(kilometersMinute: number): Promise<DriverEntity[]>;
  findById(id: number): Promise<DriverEntity | null>;
}
