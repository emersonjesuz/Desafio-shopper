import { Router, Request, Response } from "express";
import { EstimateController } from "./controllers/Estimate.controllers";
import { GoogleApiRouterService } from "./services/apiRouter/GoogleApiRouter.services";

export const router = Router();
const estimateController = new EstimateController(new GoogleApiRouterService());

router.post("/ride/estimate", (req, res) =>
  estimateController.create(req, res)
);
