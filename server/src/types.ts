import { RequestHandler } from "express";

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  postedAt: number;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
}

export type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;


export interface JwtObject {
  userId: string;
  role : string;
}