import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./router";
import { errorMiddleware } from "./middlewares/Error.middleware";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);
