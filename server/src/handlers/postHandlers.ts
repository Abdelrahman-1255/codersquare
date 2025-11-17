import { CreatePostRequest, CreatePostResponse, GetPostsRequest, GetPostsResponse } from "../api";
import { db } from "../datastore";
import type { Post, ExpressHandler } from "../types";
import crypto from "crypto";


const getPostsHandler: ExpressHandler<GetPostsRequest, GetPostsResponse> = async (req, res) => {
  const posts = await db.listPosts();
  res.send({ posts });
};


const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
  if(!req.body.title || !req.body.url) {
    res.status(400).send({ error: "Invalid post data" });
    return;
  }
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title!,
    url: req.body.url!,
    userId: res.locals.userId!,
    postedAt: Date.now(),
  }
  await db.createPost(newPost);
  res.status(201).send({ });
};

export { getPostsHandler, createPostHandler };