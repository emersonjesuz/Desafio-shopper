import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import { NotAcceptableError, NotFoundError } from "../../helpers/Api-error";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { RidesRepository } from "../../repositories/rides/Rides.repositories";
import { DistanceFormatterKilometersMinute } from "../../utils/distanceFormatter/DistanceFormatterkilometersMinute.utils";

export class RidesUseCases {
  constructor(
    private readonly ridesRepository: RidesRepository,
    private readonly driversRepository: DriversRepository
  ) {}

  async create(ridesCreateDto: RidesCreateDto): Promise<boolean> {
    const distanceFormatterKilometersMinute =
      new DistanceFormatterKilometersMinute();
    const isThereDriver = await this.driversRepository.findById(
      ridesCreateDto.driver.id
    );

    if (!isThereDriver)
      throw new NotFoundError("Motorista não encontrado", "DRIVER_NOT_FOUND");

    const checkMileage =
      isThereDriver.minimumKilometers <=
      distanceFormatterKilometersMinute.format(ridesCreateDto.distance);

    if (!checkMileage)
      throw new NotAcceptableError(
        "Quilometragem inválida para o motorista",
        "INVALID_DISTANCE"
      );

    return await this.ridesRepository.create(ridesCreateDto);
  }
}
