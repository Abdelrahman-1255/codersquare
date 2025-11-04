import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import * as postHandlers from './handlers/postHandlers';


const app = express();

app.use(express.json());

const requestLogger: RequestHandler = (req, res, next) => {
  console.log(`New request: ${req.method} ${req.url} ${req.body}`);
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/v1/posts', postHandlers.getPostsHandler);

app.post('/v1/posts', postHandlers.createPostHandler);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal Server Error" });
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});