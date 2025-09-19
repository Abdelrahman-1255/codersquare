import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/userHandler';
import { requsetLoggerMiddleware } from './middleware/loggerMiddleware';
import { erroHandler } from './middleware/errorMiddleware';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.use(erroHandler);

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
