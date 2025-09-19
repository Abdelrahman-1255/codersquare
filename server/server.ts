import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostHandler } from './handlers/postHandler';
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requsetLoggerMiddleware } from './middleware/loggerMiddleware';
import { erroHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
  await initDb();
  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(erroHandler);

  app.use(requsetLoggerMiddleware);

  app.post('/v1/signup', signUpHandler);
  app.post('/v1/signip', signInHandler);

  app.use(authMiddleware);

  app.get('/v1/posts', listPostHandler);
  app.post('/v1/posts', createPostHandler);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
