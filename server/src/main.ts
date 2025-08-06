import { ExpressHttpServer } from "./infra/http/express/ExpressHttpServer";
import { EstimateControllerFactory } from "./interface/factory/EstimateController.factory";
import { RidesControllerFactory } from "./interface/factory/RidesController.factory";

const httpServer = new ExpressHttpServer();
EstimateControllerFactory.registerRoutes(httpServer);
RidesControllerFactory.registerRoutes(httpServer);

httpServer.listen(8080);
