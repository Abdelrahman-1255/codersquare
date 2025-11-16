import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import {getPostsHandler, createPostHandler} from './handlers/postHandlers';
import asyncHandler from 'express-async-handler'
import { initDb } from './datastore';


(async () => {
  await initDb();

  const app = express();

app.use(express.json());

const requestLogger: RequestHandler = (req, res, next) => {
  console.log(`New request: ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/v1/posts', asyncHandler(getPostsHandler as  any));

app.post('/v1/posts', asyncHandler(createPostHandler as any));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal Server Error" });
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
})();