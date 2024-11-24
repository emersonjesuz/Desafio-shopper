import { RidesCreateDto } from "../../dtos/RidesCreateDto.dtos";

export interface RidesRepository {
  create(ridesCreateDto: RidesCreateDto): Promise<boolean>;
}
