import { describe, expect, it, beforeAll, vi } from "vitest";
import { RidesUseCases } from "./Rides.useCases";
import { RidesRepository } from "../../repositories/rides/Rides.repositories";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { Driver } from "../../models/Driver.models";

describe("Rides create use cases error", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ridesCreateDto: RidesCreateDto = {
    customer_id: "123",
    origin: "São paulo",
    destination: "Sergipe",
    distance: 10000,
    duration: "2 H",
    driver: {
      id: 1,
      name: "Paulinho o ruim",
    },
    value: 100,
  };
  let driver: Driver = {
    id: 2,
    name: "Paulinho o ruim",
    description: "",
    vehicle: "",
    review: { rating: 5, comment: "" },
    tax: 0,
    minimumKilometers: 10,
  };

  beforeAll(() => {
    ridesRepository = {
      create: vi.fn(),
    };

    driversRepository = {
      findById: vi.fn((id: number) => {
        if (id !== 2) return Promise.resolve(null);
        return Promise.resolve(driver);
      }),
      list: vi.fn(),
    };
    ridesUseCases = new RidesUseCases(ridesRepository, driversRepository);
  });

  it("Should return an error if the driver does not exist", async () => {
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toThrow();
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toHaveProperty(
      "error_code",
      "DRIVER_NOT_FOUND"
    );
  });

  it("Should return an error if the distance for invalid with driver", async () => {
    ridesCreateDto.driver.id = 2;
    ridesCreateDto.distance = 1000;
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toThrow();
    await expect(ridesUseCases.create(ridesCreateDto)).rejects.toHaveProperty(
      "error_code",
      "INVALID_DISTANCE"
    );
  });
});

describe("Rides create use cases success", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ridesCreateDto: RidesCreateDto = {
    customer_id: "123",
    origin: "São paulo",
    destination: "Sergipe",
    distance: 10000,
    duration: "2 H",
    driver: {
      id: 2,
      name: "Paulinho o ruim",
    },
    value: 100,
  };
  let driver: Driver = {
    id: 2,
    name: "Paulinho o ruim",
    description: "",
    vehicle: "",
    review: { rating: 5, comment: "" },
    tax: 0,
    minimumKilometers: 10,
  };

  beforeAll(() => {
    ridesRepository = {
      create: vi.fn(() => Promise.resolve(true)),
    };

    driversRepository = {
      findById: vi.fn((id: number) => {
        if (id !== 2) return Promise.resolve(null);
        return Promise.resolve(driver);
      }),
      list: vi.fn(),
    };
    ridesUseCases = new RidesUseCases(ridesRepository, driversRepository);
  });

  it("Should return an boolean if success", async () => {
    await expect(ridesUseCases.create(ridesCreateDto)).resolves.toBe(true);
  });
});
