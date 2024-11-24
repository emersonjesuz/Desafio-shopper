import { Driver } from "../../models/Driver.models";

export interface DriversRepository {
  list(kilometersMinute: number): Promise<Driver[]>;
}
