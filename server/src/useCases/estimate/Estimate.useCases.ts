import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { CalculateTotalValue } from "../../utils/calculatePrice/CalculateTotalValue.utils";

interface OutputDriver {
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

  async list(
    kilometersMinute: number,
    ordemBy: "asc" | "desc"
  ): Promise<OutputDriver[]> {
    const calculateTotalValue = new CalculateTotalValue();
    const listDriversInDb = await this.driversRepository.list(kilometersMinute);
    const drivers: OutputDriver[] = [];

    listDriversInDb.forEach((driver) =>
      drivers.push({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: calculateTotalValue.execute(driver.tax, kilometersMinute),
      })
    );

    if (ordemBy === "asc") {
      return drivers.sort((a, b) => {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        return 0;
      });
    }
    return drivers.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
  }
}
