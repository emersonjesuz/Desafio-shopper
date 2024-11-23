import { expect, describe, it } from "vitest";
import { DistanceFormatterKilometersMinute } from "./DistanceFormatterkilometersMinute.utils";

describe("Distance formatter kilometers minute", () => {
  it("Should return correct formats", () => {
    const distanceFormatter = new DistanceFormatterKilometersMinute();
    const formatterDistance0Km = distanceFormatter.format(0);

    expect(formatterDistance0Km).toEqual(0);
  });
});
