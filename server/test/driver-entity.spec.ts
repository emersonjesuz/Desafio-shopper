import { expect, describe, it, beforeAll } from "vitest";
import { DriverEntity } from "../src/domain/entities/Driver.entities";
import { ReviewCommentEnumKey } from "../src/domain/entities/Review-comment.enum";

describe("Driver entity", () => {
  it("Deve criar um motorista", () => {
    const driver = {
      id: 1,
      name: "Paulinho o ruim",
      description: "",
      vehicle: "Car",
      review: { rating: 0, comment: "Gostei!" as ReviewCommentEnumKey },
      tax: 0,
      minimumKilometers: 10,
    };
    const input = new DriverEntity(
      driver.id,
      driver.name,
      driver.description,
      driver.vehicle,
      driver.tax,
      driver.minimumKilometers,
      driver.review
    );
    const output = driver;
    expect(input.toJson()).toEqual(output);
  });

  it("Deve não ser possivel criar um motorista se id for vazio ou menor igual zero", () => {
    const driver = {
      id: 0,
      name: "Paulinho o ruim",
      description: "",
      vehicle: "Car",
      tax: 0,
      minimumKilometers: 10,
      review: { rating: 0, comment: "Bom" as ReviewCommentEnumKey },
    };
    expect(
      () =>
        new DriverEntity(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.tax,
          driver.minimumKilometers,
          driver.review
        )
    ).toThrowError("Id is invalid");
  });
  it("Deve não ser possivel criar um motorista se nome for vazio", () => {
    const driver = {
      id: 1,
      name: "",
      description: "",
      vehicle: "",
      tax: 0,
      minimumKilometers: 10,
      review: { rating: 0, comment: "Bom" as ReviewCommentEnumKey },
    };
    expect(
      () =>
        new DriverEntity(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.tax,
          driver.minimumKilometers,
          driver.review
        )
    ).toThrowError("Name is obligatory");
  });

  it("Deve não ser possivel criar um motorista sem veiculo", () => {
    const driver = {
      id: 1,
      name: "pedro",
      description: "",
      vehicle: "",
      tax: 0,
      minimumKilometers: 10,
      review: { rating: 0, comment: "Bom" as ReviewCommentEnumKey },
    };
    expect(
      () =>
        new DriverEntity(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.tax,
          driver.minimumKilometers,
          driver.review
        )
    ).toThrowError("Vehicle is obligatory");
  });

  it("Deve não ser possivel criar um motorista com taxa menor que zero", () => {
    const driver = {
      id: 1,
      name: "pedro",
      description: "",
      vehicle: "Car",
      tax: -1,
      minimumKilometers: 10,
      review: { rating: 0, comment: "Bom" as ReviewCommentEnumKey },
    };
    expect(
      () =>
        new DriverEntity(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.tax,
          driver.minimumKilometers,
          driver.review
        )
    ).toThrowError("Tax is invalid");
  });

  it("Deve não ser possivel criar um motorista com minumo de quilometragem menor ou igual a zero", () => {
    const driver = {
      id: 1,
      name: "pedro",
      description: "",
      vehicle: "Car",
      tax: 1,
      minimumKilometers: 0,
      review: { rating: 0, comment: "Gostei!" as ReviewCommentEnumKey },
    };
    expect(
      () =>
        new DriverEntity(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.tax,
          driver.minimumKilometers,
          driver.review
        )
    ).toThrowError("Minimum kilometers is invalid");
  });

  it("Deve lançar um erro se a distancia for menor que a distancia minima do motorista", () => {
    const driver = new DriverEntity(1, "pedro", "", "Car", 1, 10, { rating: 0, comment: "Gostei!" as ReviewCommentEnumKey });
    const distance = 10;
    expect(() => driver.canAcceptRide(distance)).toThrowError("Quilometragem inválida para o motorista");
  });
});
