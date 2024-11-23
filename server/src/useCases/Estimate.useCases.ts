import { VehicleRepository } from "../repositories/vehicle/Vehicle.repositories";
import { CalculateTotalValue } from "../utils/calculatePrice/CalculateTotalValue.utils";

interface Driver {
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
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async list(
    kilometersMinute: number,
    ordemBy: "asc" | "desc"
  ): Promise<Driver[]> {
    const calculateTotalValue = new CalculateTotalValue();
    const vehicles = await this.vehicleRepository.list(kilometersMinute);
    const drivers: Driver[] = [];

    vehicles.forEach((vehicle) =>
      drivers.push({
        id: vehicle.id,
        name: vehicle.name,
        description: vehicle.description,
        vehicle: vehicle.vehicle,
        review: vehicle.review,
        value: calculateTotalValue.execute(vehicle.tax, kilometersMinute),
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
