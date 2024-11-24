import { Router, Request, Response } from "express";
import { EstimateController } from "./controllers/Estimate.controllers";
import { EstimateCreateMiddlewares } from "./middlewares/estimate/EstimateCreate.middlewares";
import { GoogleApiRouterService } from "./services/apiRouter/GoogleApiRouter.services";
import { RidesCreateMiddleware } from "./middlewares/rides/RidesCreate.middleware";
import { RidesController } from "./controllers/Rides.controllers";

export const router = Router();
const estimateController = new EstimateController(new GoogleApiRouterService());
const estimateCreateMiddlewares = new EstimateCreateMiddlewares();
const ridesController = new RidesController();
const ridesCreateMiddleware = new RidesCreateMiddleware();

router.post(
  "/ride/estimate",
  estimateCreateMiddlewares.execute,
  async (request: Request, response: Response) => {
    await estimateController.create(request, response);
  }
);

router.patch(
  "/ride/confirm",
  ridesCreateMiddleware.execute,
  async (request: Request, response: Response) => {
    await ridesController.save(request, response);
  }
);
