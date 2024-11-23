import { CalculatePrice } from "./CalculatePrice.utils";

export class CalculateTotalValue implements CalculatePrice {
  execute(tax: number, kilometer: number): number {
    return tax * kilometer;
  }
}
