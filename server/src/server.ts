import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import {getPostsHandler, createPostHandler} from './handlers/postHandlers';
import asyncHandler from 'express-async-handler'
import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandlers';
import { requestLogger } from './middleware/loggerMiddleware';
import { errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';


(async () => {
  await initDb();
dotenv.config();
  const app = express();

app.use(express.json());

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/v1/signup', asyncHandler(signUpHandler as any));

app.post('/v1/signin', asyncHandler(signInHandler as any));

app.use(authMiddleware);
// Protected routes below
app.get('/v1/posts', asyncHandler(getPostsHandler as  any));

app.post('/v1/posts', asyncHandler(createPostHandler as any));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
})();