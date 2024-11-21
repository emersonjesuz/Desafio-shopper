import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/Api-error";

export const errorMiddleware = async (
  err: Error & Partial<ApiError>,
  res: Response
) => {
  const statusCode = err.statusCode ?? 500;

  if (statusCode === 500) {
    return res.status(500).json({ message: err });
  }
  return res.status(statusCode).json({ message: err.message });
};
