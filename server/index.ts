import express, { RequestHandler } from "express";
import { db } from "./datastore";
import { createPostHandler, listPostHandler } from "./handlers/postHandlers";

const app = express();

app.use(express.json());

const requsetLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "body", req.body);
  next();
};

app.use(requsetLoggerMiddleware);

app.get("/posts", listPostHandler);

app.post("/posts", createPostHandler);

app.listen(3000);
