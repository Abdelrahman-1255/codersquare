import { ErrorRequestHandler } from 'express';

export const erroHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.log('opps! unexpected error', err);
};
