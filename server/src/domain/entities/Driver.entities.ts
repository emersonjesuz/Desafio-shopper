import { ReviewCommentEnumKey } from "./Review-comment.enum";
import { NotAcceptableError } from "../../interface/http/errors/Api-error";
import { DistanceFormatterKilometersMinute } from "../../utils/distanceFormatter/DistanceFormatterKilometersMinute.utils";
import { ReviewEntity } from "./Review.entity";

export class DriverEntity {
  private readonly id: number;
  private readonly name: string;
  private readonly description: string;
  private readonly vehicle: string;
  private readonly tax: number;
  private readonly minimumKilometers: number;
  private readonly review: ReviewEntity;

  constructor(
    id: number,
    name: string,
    description: string,
    vehicle: string,
    tax: number,
    minimumKilometers: number,
    review: { rating: number; comment: ReviewCommentEnumKey }
  ) {
    this.validadeId(id);
    this.validadeName(name);
    this.validadeVehicle(vehicle);
    this.validadeTax(tax);
    this.validadeMinimumKilometers(minimumKilometers);

    this.id = id;
    this.name = name;
    this.description = description;
    this.minimumKilometers = minimumKilometers;
    this.vehicle = vehicle;
    this.tax = tax;
    this.review = new ReviewEntity(review.rating, review.comment);
  }

  private validadeId(id: number) {
    if (id <= 0) {
      throw new Error("Id is invalid");
    }
  }
  private validadeName(name: string) {
    if (!name.trim().length) {
      throw new Error("Name is obligatory");
    }
  }
  private validadeVehicle(vehicle: string) {
    if (!vehicle.trim().length) {
      throw new Error("Vehicle is obligatory");
    }
  }

  private validadeTax(tax: number) {
    if (tax < 0) {
      throw new Error("Tax is invalid");
    }
  }
  private validadeMinimumKilometers(minimumKilometers: number) {
    if (minimumKilometers <= 0) {
      throw new Error("Minimum kilometers is invalid");
    }
  }

  canAcceptRide(distance: number) {
    const checkMileage = this.minimumKilometers <= distance / 1000;
    if (!checkMileage) throw new NotAcceptableError("Quilometragem inválida para o motorista", "INVALID_DISTANCE");
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      minimumKilometers: this.minimumKilometers,
      vehicle: this.vehicle,
      tax: this.tax,
      review: this.review,
    };
  }
}
