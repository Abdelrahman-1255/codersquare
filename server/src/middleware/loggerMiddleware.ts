import { RequestHandler } from 'express';
export const requestLogger: RequestHandler = (req, res, next) => {
  const sanitizedBody = { ...req.body };
  // Hide sensitive fields
  if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
  
  console.log(`${req.method} ${req.url} ${JSON.stringify(sanitizedBody)}`);
  next();
};