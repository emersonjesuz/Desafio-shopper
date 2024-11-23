import { Router, Request, Response } from "express";
import { EstimateController } from "./controllers/Estimate.controllers";
import { EstimateCreateMiddlewares } from "./middlewares/estimate/EstimateCreate.middlewares";
import { GoogleApiRouterService } from "./services/apiRouter/GoogleApiRouter.services";

export const router = Router();
const estimateController = new EstimateController(new GoogleApiRouterService());
const estimateCreateMiddlewares = new EstimateCreateMiddlewares();

router.post(
  "/ride/estimate",
  estimateCreateMiddlewares.execute,
  (request: Request, response: Response) => {
    estimateController.create(request, response);
  }
);
