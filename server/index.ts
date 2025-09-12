import express, { ErrorRequestHandler, RequestHandler } from "express";
import { db } from "./datastore";
import { createPostHandler, listPostHandler } from "./handlers/postHandlers";
import e from "express";

const app = express();

app.use(express.json());

const requsetLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "body", req.body);
  next();
};

app.use(requsetLoggerMiddleware);

app.get("/v1/posts", listPostHandler);

app.post("/v1/posts", createPostHandler);

const erroHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.log("opps! unexpected error", err);
  next();
};

app.use(erroHandler);

app.listen(3000);
