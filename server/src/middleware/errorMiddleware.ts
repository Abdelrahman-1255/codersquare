import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal Server Error" });
}