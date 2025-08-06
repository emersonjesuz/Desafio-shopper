import { expect, describe, it } from "vitest";
import { DistanceFormatterKilometersMinute } from "./DistanceFormatterKilometersMinute.utils";

describe("Distance formatter kilometers minute", () => {
  it("Should return correct formats", () => {
    const distanceFormatter = new DistanceFormatterKilometersMinute();
    const formatterDistance0Km = distanceFormatter.format(0);
    const formatterDistance10Km = distanceFormatter.format(10000);

    expect(formatterDistance0Km).toEqual(0);
    expect(formatterDistance10Km).toEqual(10);
  });
});
