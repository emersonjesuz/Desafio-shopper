import { RidesCreateDto } from "../../application/dtos/RidesCreateDto.dtos";
import { RidesListResponseDto, RideResponse } from "../../application/dtos/RidesListResponse.dtos";
import { BadRequestError, NotAcceptableError, NotFoundError } from "../../interface/http/errors/Api-error";
import { DriversRepository } from "../../domain/repositories/Drivers.repositories";
import { RidesRepository } from "../../domain/repositories/Rides.repositories";
import { DistanceFormatterKilometersMinute } from "../../utils/distanceFormatter/DistanceFormatterKilometersMinute.utils";

export class RidesUseCases {
  constructor(private readonly ridesRepository: RidesRepository, private readonly driversRepository: DriversRepository) {}

  async create(ridesCreateDto: RidesCreateDto): Promise<boolean> {
    const driver = await this.driversRepository.findById(ridesCreateDto.driver.id);
    if (!driver) throw new NotFoundError("Motorista não encontrado", "DRIVER_NOT_FOUND");
    driver.canAcceptRide(ridesCreateDto.distance);
    return await this.ridesRepository.create(ridesCreateDto);
  }

  async list(customer_id: string, driver_id?: number): Promise<RidesListResponseDto> {
    const isThereCustomer = await this.ridesRepository.findByCustomerId(customer_id);
    if (!isThereCustomer) throw new NotFoundError("Nenhum registro encontrado", "NO_RIDES_FOUND");
    if (driver_id) {
      const isThereDriver = await this.driversRepository.findById(driver_id);
      if (!isThereDriver) throw new BadRequestError("Motorista invalido", "INVALID_DRIVER");
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
