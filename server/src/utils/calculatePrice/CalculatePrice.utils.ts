export interface CalculatePrice {
  execute(tax: number, kilometer: number): number;
}
