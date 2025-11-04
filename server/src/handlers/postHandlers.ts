import { CreatePostRequest, CreatePostResponse, GetPostsRequest, GetPostsResponse } from "../api";
import { db } from "../datastore";
import type { Post, ExpressHandler } from "../types";
import crypto from "crypto";


const getPostsHandler: ExpressHandler<GetPostsRequest, GetPostsResponse> = (req, res) => {
  const posts = db.listPosts();
  res.send({ posts: posts });
};


const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = (req, res) => {
  if(!req.body.title || !req.body.url || !req.body.userId) {
    res.status(400).send({ error: "Invalid post data" });
    return;
  }
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: req.body.title!,
    url: req.body.url!,
    userId: req.body.userId!,
    postedAt: Date.now(),
  }
  db.createPost(newPost);
  res.status(201).send({ post: newPost });
};

export { getPostsHandler, createPostHandler };