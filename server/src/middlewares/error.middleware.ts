import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/Api-error";

interface FormattedError {
  error_code: string;
  error_description: string;
}

export const errorMiddleware = async (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.code ?? 500;
  const statusMessage = err.error_code ?? "ERROR";
  const message = err.message || err.error_description;
  const errorStructure = {
    error_code: statusMessage,
    error_description: message,
  };

  return res.status(statusCode).json(errorStructure);
};
