import { expect, describe, it, beforeAll } from "vitest";
import { EstimateUseCases } from "./Estimate.useCases";
import { ImMemoryRepositories } from "../../database/repositories/InMemory.repositories";

describe("estimate create", () => {
  let estimateUseCases: EstimateUseCases;
  beforeAll(() => {
    estimateUseCases = new EstimateUseCases(new ImMemoryRepositories());
  });

  it("Should return an empty list", async () => {
    expect(await estimateUseCases.list(0, "asc")).toHaveLength(0);
  });

  it("Must returns a list of drivers", async () => {
    expect(await estimateUseCases.list(50, "asc")).toBeInstanceOf(Array);
  });

  it("The first value must be less than the last", async () => {
    const list = await estimateUseCases.list(50, "asc");
    const firstDriver = list[0];
    const lastDriver = list[list.length - 1];
    expect(firstDriver.value).toBeLessThanOrEqual(lastDriver.value);
  });
  it("The first value must be greater than the last", async () => {
    const list = await estimateUseCases.list(50, "desc");
    const firstDriver = list[0];
    const lastDriver = list[list.length - 1];
    expect(firstDriver.value).toBeGreaterThanOrEqual(lastDriver.value);
  });
});
