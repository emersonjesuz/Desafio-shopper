import { CalculateTotalValue } from "../../domain/entities/CalculateTotalValue.entity";
import { DriverSort } from "../../domain/entities/DriverSort.entity";
import { DriversRepository } from "../../domain/repositories/Drivers.repositories";

export interface EstimateOutputDto {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

interface Review {
  rating: number;
  comment: string;
}

export class EstimateUseCases {
  constructor(private readonly driversRepository: DriversRepository) {}

  async list(kilometersMinute: number, orderBy: "asc" | "desc"): Promise<EstimateOutputDto[]> {
    const calculateTotalValue = new CalculateTotalValue();
    const driversDataDatabase = await this.driversRepository.list(kilometersMinute);
    const drivers = driversDataDatabase.map((driver) => {
      const jsonDriver = driver.toJson();
      return {
        ...jsonDriver,
        value: calculateTotalValue.execute(jsonDriver.tax, kilometersMinute),
      };
    });
    return DriverSort.sort(drivers, orderBy);
  }
}
