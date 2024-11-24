import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";
import {
  RidesListResponseDto,
  RideResponse,
} from "../../dtos/RidesListResponse.dtos";
import {
  BadRequestError,
  NotAcceptableError,
  NotFoundError,
} from "../../helpers/Api-error";
import { DriversRepository } from "../../repositories/drivers/Drivers.repositories";
import { RidesRepository } from "../../repositories/rides/Rides.repositories";
import { DistanceFormatterKilometersMinute } from "../../utils/distanceFormatter/DistanceFormatterKilometersMinute.utils";

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

  async list(
    customer_id: string,
    driver_id?: number
  ): Promise<RidesListResponseDto> {
    const isThereCustomer = await this.ridesRepository.findByCustomerId(
      customer_id
    );

    if (!isThereCustomer)
      throw new NotFoundError("Nenhum registro encontrado", "NO_RIDES_FOUND");

    if (driver_id) {
      const isThereDriver = await this.driversRepository.findById(driver_id);

      if (!isThereDriver)
        throw new BadRequestError("Motorista invalido", "INVALID_DRIVER");
    }

    const rides = await this.ridesRepository.list(customer_id, driver_id);

    const ridesFormattedResponse: RideResponse[] = rides.map((ride) => {
      return {
        id: ride.id,
        date: ride.date,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
        },
        value: ride.value,
      };
    });

    const ridesResponse: RidesListResponseDto = {
      customer_id,
      rides: ridesFormattedResponse,
    };

    return ridesResponse;
  }
}
