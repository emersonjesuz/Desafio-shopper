import { RidesUseCases } from "../../application/useCases/Rides.useCases";
import { PrismaDriversRepositories } from "../../infra/repositories/PrismaDrivers.repositories";
import { PrismaRidesRepository } from "../../infra/repositories/PrismaRides.repositories";
import { RidesController } from "../controllers/Rides.controllers";
import { IHttpServer } from "../http/IHttpServer";

export class RidesControllerFactory {
  static registerRoutes(server: IHttpServer) {
    const driverRepository = new PrismaDriversRepositories();
    const ridesRepository = new PrismaRidesRepository();
    const ridesUseCases = new RidesUseCases(ridesRepository, driverRepository);
    return new RidesController(ridesUseCases).registerRoutes(server);
  }
}
