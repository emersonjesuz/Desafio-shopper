import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { EstimateCreateMiddlewares } from "./EstimateCreate.middlewares";

describe("Estimate create middleware", () => {
  let request;
  let response: Response;
  let next: () => void;

  it("should not be possible to pass if you do not provide the customer_id", () => {
    request = {
      body: {
        customer_id: "",
      },
    } as unknown as Request;

    const estimateCreate = EstimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    expect(estimateCreate).rejects.toThrow();
    expect(estimateCreate).rejects.toHaveProperty("error_code");
  });

  it("Should not pass if destination and origin are empty", () => {
    request = {
      body: {
        customer_id: "123",
      },
    } as unknown as Request;

    const estimateCreate = EstimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    expect(estimateCreate).rejects.toThrow();
    expect(estimateCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if destination and origin are the same", () => {
    request = {
      body: {
        customer_id: "123",
        destination: "salvador",
        origin: "salvador",
      },
    } as unknown as Request;

    const estimateCreate = EstimateCreateMiddlewares.execute(
      request,
      response,
      next
    );

    expect(estimateCreate).rejects.toThrow();
    expect(estimateCreate).rejects.toHaveProperty("error_description");
  });
});
