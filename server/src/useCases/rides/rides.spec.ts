import { describe, expect, it, beforeAll, vi } from "vitest";
import { RidesUseCases } from "./Rides.useCases";
import { RidesRepository } from "../../repositories/rides/Rides.repositories";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { Driver } from "../../models/Driver.models";
import { Ride } from "../../models/Rides.models";

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
      findByCustomerId: vi.fn(),
      list: vi.fn(),
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
      list: vi.fn(),
      findByCustomerId: vi.fn(),
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

describe("Rides list use cases error", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ride: Ride = {
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
    date: new Date(),
    id: 1,
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
      list: vi.fn(),
      findByCustomerId: vi.fn((customer_id: string) => {
        if (customer_id !== "123") return Promise.resolve(null);
        return Promise.resolve(ride);
      }),
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

  it("Should return an error if the customer does not exist", async () => {
    await expect(ridesUseCases.list("error")).rejects.toThrow();
    await expect(ridesUseCases.list("error")).rejects.toHaveProperty(
      "error_code",
      "NO_RIDES_FOUND"
    );
  });

  it("Should return an error if the driver does not exist", async () => {
    await expect(ridesUseCases.list("123", 1)).rejects.toThrow();
    await expect(ridesUseCases.list("123", 1)).rejects.toHaveProperty(
      "error_code",
      "INVALID_DRIVER"
    );
  });
});

describe("Rides list use cases success", () => {
  let ridesUseCases: RidesUseCases;
  let ridesRepository: RidesRepository;
  let driversRepository: DriversRepository;
  let ride: Ride = {
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
    date: new Date(),
    id: 1,
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
      list: vi.fn((customer_id: string, driver_id?: number) => {
        if (driver_id) return Promise.resolve([ride]);
        return Promise.resolve([ride, ride, ride]);
      }),
      findByCustomerId: vi.fn((customer_id: string) => {
        if (customer_id !== "123") return Promise.resolve(null);
        return Promise.resolve(ride);
      }),
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

  it("Should return an Object containing the list of rides", async () => {
    await expect(ridesUseCases.list("123")).resolves.toBeInstanceOf(Object);
    await expect(ridesUseCases.list("123")).resolves.toHaveProperty(
      "customer_id",
      "123"
    );
  });

  it("Must return an object containing the list of trips if driver_id is valid", async () => {
    await expect(ridesUseCases.list("123")).resolves.toBeInstanceOf(Object);
    await expect(ridesUseCases.list("123")).resolves.toHaveProperty(
      "customer_id",
      "123"
    );
  });
});
