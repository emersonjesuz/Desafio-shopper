import { RidesCreateDto } from "../../application/dtos/RidesCreateDto.dtos";
import { Ride } from "../../models/Rides.models";

export interface RidesRepository {
  create(ridesCreateDto: RidesCreateDto): Promise<boolean>;
  list(customer_id: string, driver_id?: number): Promise<Ride[]>;
  findByCustomerId(customer_id: string): Promise<Ride | null>;
}
