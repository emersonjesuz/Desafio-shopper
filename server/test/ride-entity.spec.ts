import { describe, expect, it } from "vitest";
import { RideEntity } from "../src/entities/Ride.entity";

describe("Ride entity", () => {
  it("Deve ser possivel criar um ride", () => {
    const input = {
      customer_id: "emerson123",
      id: 2,
      date: new Date(),
      origin: "ali",
      destination: "para la",
      distance: 20,
      duration: "1m",
      value: 10,
      driver_id: 1,
    };
    const output = input;
    const rideEntity = new RideEntity(
      input.customer_id,
      input.id,
      input.date,
      input.origin,
      input.destination,
      input.distance,
      input.duration,
      input.value,
      input.driver_id
    );
    expect(rideEntity.toJson()).toEqual(output);
  });

  it("Não dev ser possivel criar um ride com id invalido", () => {
    expect(() => new RideEntity("emerson123", 0, new Date(), "ali", "para la", 10, "2s", 10, 1)).toThrowError("Id is obligatory");
    expect(() => new RideEntity("emerson123", -1, new Date(), "ali", "para la", 10, "2s", 10, 1)).toThrowError(
      "Id is obligatory"
    );
  });

  it("Não dev ser possivel criar um ride se o customer id não for informado", () => {
    expect(() => new RideEntity("", 2, new Date(), "ali", "para la", 10, "2s", 10, 1)).toThrowError("Customer Id is obligatory");
  });

  it("Não dev ser possivel criar um ride se a data for invalida", () => {
    expect(() => new RideEntity("emerson123", 2, new Date("11/11/11a1"), "ali", "para la", 10, "2s", 10, 1)).toThrowError(
      "Date is invalid"
    );
  });

  it("Não dev ser possivel criar um ride se caminho de origin não for informado", () => {
    expect(() => new RideEntity("emerson123", 2, new Date(), "", "para la", 10, "2s", 10, 1)).toThrowError(
      "Origin is Obligatory"
    );
  });

  it("Não dev ser possivel criar um ride se caminho de destino não for informado", () => {
    expect(() => new RideEntity("emerson123", 2, new Date(), "ali o", "", 10, "2s", 10, 1)).toThrowError(
      "Destination is Obligatory"
    );
  });

  it("Não dev ser possivel criar um ride se a distancia for menor que 20m", () => {
    expect(() => new RideEntity("emerson123", 2, new Date(), "ali o", "opa", 10, "2s", 10, 1)).toThrowError(
      "Distance is invalid"
    );
  });

  it("Não dev ser possivel criar uma ride duração não for informada", () => {
    expect(() => new RideEntity("emerson123", 2, new Date(), "ali o", "opa", 20, "", 10, 1)).toThrowError("Duration is invalid");
  });
});
