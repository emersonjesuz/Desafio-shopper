import { RidesUseCases } from "../../application/useCases/Rides.useCases";
import { IHttpController } from "../http/IHttpController";
import { IHttpServer } from "../http/IHttpServer";

export class RidesController implements IHttpController {
  constructor(private readonly ridesUseCases: RidesUseCases) {}

  registerRoutes(httpServer: IHttpServer): void {
    httpServer.register("post", "/ride/confirm", async (params: any, body: any, query: any) => {
      const { customer_id, destination, distance, driver, duration, origin, value } = body;

      const save = await this.ridesUseCases.create({
        customer_id,
        destination,
        distance,
        driver,
        duration,
        origin,
        value,
      });

      return { success: save };
    });

    httpServer.register("get", "/ride/:customer_id", async (params: any, body: any, query: any) => {
      const { customer_id } = params;
      const { driver_id } = query;
      const rides = await this.ridesUseCases.list(customer_id, Number(driver_id));
      return { ...rides };
    });
  }
}
