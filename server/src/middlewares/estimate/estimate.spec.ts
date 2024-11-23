import { describe, expect, it, beforeAll } from "vitest";
import { Request, Response } from "express";
import { EstimateCreateMiddlewares } from "./EstimateCreate.middlewares";

describe("Estimate create middleware", () => {
  let request: Request;
  let response: Response;
  let next: () => void;
  let estimateCreateMiddlewares: EstimateCreateMiddlewares;

  beforeAll(() => {
    estimateCreateMiddlewares = new EstimateCreateMiddlewares();
  });

  it("should not be possible to pass if you do not provide the customer_id", async () => {
    request = {
      body: {
        customer_id: "",
      },
    } as unknown as Request;

    const estimateCreate = estimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    await expect(estimateCreate).rejects.toThrow();
    await expect(estimateCreate).rejects.toHaveProperty("error_code");
  });

  it("Should not pass if destination and origin are empty", async () => {
    request = {
      body: {
        customer_id: "123",
      },
    } as unknown as Request;

    const estimateCreate = estimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    await expect(estimateCreate).rejects.toThrow();
    await expect(estimateCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if destination and origin are the same", async () => {
    request = {
      body: {
        customer_id: "123",
        destination: "salvador",
        origin: "salvador",
      },
    } as unknown as Request;

    const estimateCreate = estimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    await expect(estimateCreate).rejects.toThrow();
    await expect(estimateCreate).rejects.toHaveProperty("error_description");
  });
});
