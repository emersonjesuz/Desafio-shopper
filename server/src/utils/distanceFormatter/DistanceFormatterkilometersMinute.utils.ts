import { DistanceFormatter } from "./DistanceFormatter.utils";

export class DistanceFormatterKilometersMinute implements DistanceFormatter {
  format(distance: number): number {
    return distance / 1000;
  }
}
