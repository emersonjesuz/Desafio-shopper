import { expect, describe, it, beforeAll } from "vitest";
import { RidesCreateMiddleware } from "./RidesCreate.middleware";
import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { Request, Response } from "express";

describe("Ride create middlewares", () => {
  let request: Request;
  let response: Response;
  let next: () => void;
  let ridesCreateMiddleware: RidesCreateMiddleware;
  let dataBody: RidesCreateDto = {
    customer_id: "123",
    origin: "São paulo",
    destination: "Sergipe",
    distance: 1500,
    duration: "2 H",
    driver: {
      id: 1,
      name: "Paulinho o ruim",
    },
    value: 100,
  };

  beforeAll(() => {
    ridesCreateMiddleware = new RidesCreateMiddleware();
  });

  it("Should not be possible to pass if you do not provide the customer_id", async () => {
    request = {
      body: { ...dataBody, customer_id: "" },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_code");
  });

  it("Should not pass if destination and origin are empty", async () => {
    request = {
      body: { ...dataBody, destination: "", origin: "" },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });
  it("Should not pass if destination and origin are equals", async () => {
    request = {
      body: { ...dataBody, destination: "São paulo", origin: "São paulo" },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if distance is less or equal than 0", async () => {
    request = {
      body: { ...dataBody, distance: 0 },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if duration is empty", async () => {
    request = {
      body: { ...dataBody, duration: "" },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if value is less or equal than 0", async () => {
    request = {
      body: { ...dataBody, value: 0 },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });

  it("Should not pass if driver not received id or name", async () => {
    request = {
      body: { ...dataBody, driver: {} },
    } as unknown as Request;

    const RidesCreate = ridesCreateMiddleware.execute(request, response, next);
    await expect(() => RidesCreate).rejects.toThrow();
    await expect(() => RidesCreate).rejects.toHaveProperty("error_description");
  });
});
