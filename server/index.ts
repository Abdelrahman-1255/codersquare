import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/userHandler';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  const erroHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    console.log('opps! unexpected error', err);
  };

  app.use(erroHandler);

  const requsetLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, 'body', req.body);
    next();
  };

  app.use(requsetLoggerMiddleware);

  app.get('/v1/posts', listPostHandler);

  app.post('/v1/posts', createPostHandler);

  app.post('/v1/signup', signUpHandler);
  app.post('/v1/signip', signInHandler);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
