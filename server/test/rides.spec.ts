import { describe, expect, it, beforeEach, vi } from "vitest";
import { RidesUseCases } from "./Rides.useCases";
import { RidesRepository } from "../../repositories/rides/Rides.repositories";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { Driver } from "../../models/Driver.models";
import { Ride } from "../../models/Rides.models";
import { DriverEntity } from "../../entities/Driver.entities";
import { ReviewCommentEnumKey } from "../../enums/Review-comment.enum";

describe("RidesUseCases - Create Ride", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ridesCreateDto: RidesCreateDto;
  let driver: DriverEntity;

  beforeEach(() => {
    ridesCreateDto = {
      customer_id: "123",
      origin: "São Paulo",
      destination: "Sergipe",
      distance: 10000,
      duration: "2 H",
      driver: { id: 1, name: "Paulinho" },
      value: 100,
    };

    driver = new DriverEntity(2, "Paulinho", "", "car", 0, 1, { rating: 5, comment: "Excelente!" });

    ridesRepository = {
      create: vi.fn(),
      findByCustomerId: vi.fn(),
      list: vi.fn(),
    };

    driversRepository = {
      findById: vi.fn((id: number) => (id === 2 ? Promise.resolve(driver) : Promise.resolve(null))),
      list: vi.fn(),
    };

    ridesUseCases = new RidesUseCases(ridesRepository, driversRepository);
  });

  it("Should throw DRIVER_NOT_FOUND if driver does not exist", async () => {
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toHaveProperty("error_code", "DRIVER_NOT_FOUND");
  });

  it("Should throw INVALID_DISTANCE if ride distance is below driver's minimum", async () => {
    ridesCreateDto.driver.id = 2;
    ridesCreateDto.distance = 5;
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toHaveProperty("error_code", "INVALID_DISTANCE");
  });

  it("Should return true when ride creation succeeds", async () => {
    ridesCreateDto.driver.id = 2;
    ridesRepository.create = vi.fn(() => Promise.resolve(true));
    await expect(ridesUseCases.create(ridesCreateDto)).resolves.toBe(true);
  });
});

describe("RidesUseCases - List Rides", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ride: Ride;
  let driver: DriverEntity;

  beforeEach(() => {
    ride = {
      customer_id: "123",
      origin: "São Paulo",
      destination: "Sergipe",
      distance: 10000,
      duration: "2 H",
      driver: { id: 2, name: "Paulinho" },
      value: 100,
      date: new Date(),
      id: 1,
    };

    driver = new DriverEntity(2, "Paulinho", "", "car", 0, 1, { rating: 5, comment: "Excelente!" });

    ridesRepository = {
      create: vi.fn(),
      list: vi.fn((customer_id: string, driver_id?: number) =>
        driver_id ? Promise.resolve([ride]) : Promise.resolve([ride, ride, ride])
      ),
      findByCustomerId: vi.fn((customer_id: string) => (customer_id === "123" ? Promise.resolve(ride) : Promise.resolve(null))),
    };

    driversRepository = {
      findById: vi.fn((id: number) => (id === 2 ? Promise.resolve(driver) : Promise.resolve(null))),
      list: vi.fn(),
    };

    ridesUseCases = new RidesUseCases(ridesRepository, driversRepository);
  });

  it("Should throw NO_RIDES_FOUND if no rides exist for the customer", async () => {
    await expect(ridesUseCases.list("invalid")).rejects.toHaveProperty("error_code", "NO_RIDES_FOUND");
  });

  it("Should throw INVALID_DRIVER if the driver does not exist", async () => {
    await expect(ridesUseCases.list("123", 1)).rejects.toHaveProperty("error_code", "INVALID_DRIVER");
  });

  it("Should return an object containing customer rides", async () => {
    const result = await ridesUseCases.list("123");
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty("customer_id", "123");
  });

  it("Should return rides filtered by driver when driver_id is valid", async () => {
    const result = await ridesUseCases.list("123", 2);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty("customer_id", "123");
  });
});
