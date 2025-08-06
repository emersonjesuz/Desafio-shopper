import { EstimateOutputDto } from "../../useCases/estimate/Estimate.useCases";

export class DriverSort {
  static sort(drivers: EstimateOutputDto[], orderBy: "asc" | "desc") {
    return drivers.sort((a, b) => (orderBy === "asc" ? a.value - b.value : b.value - a.value));
  }
}
