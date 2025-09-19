import { ExpressHandler } from '../types';
import { db } from '../datastore';
import { Post } from '../types';
import crypto from 'crypto';
import { createPostRequest, createPostResponse, ListPostsRequest, ListPostsResponse } from '../api';

export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
  req,
  res
) => {
  console.log(req.headers.authorization);
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = async (
  req,
  res
) => {
  if (!req.body.title || !req.body.url || !req.body?.userId) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    posteAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  await db.createPost(post);
  res.sendStatus(200);
};
