import { expect, describe, it } from "vitest";
import { CalculateTotalValue } from "./CalculateTotalValue.utils";

describe("Calculate total value", () => {
  it("Should return correct value", () => {
    const calculateTotalValue = new CalculateTotalValue();

    const calculateTotalValue0 = calculateTotalValue.execute(0, 0);
    const calculateTotalValue40 = calculateTotalValue.execute(20, 2);
    const calculateTotalValue150 = calculateTotalValue.execute(10, 15);

    expect(calculateTotalValue0).toBe(0);
    expect(calculateTotalValue40).toBe(40);
    expect(calculateTotalValue150).toBe(150);
  });
});
