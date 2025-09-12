import { Post } from "./types";

// post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type createPostRequest = Pick<Post, "title" | "url" | "userId">;
export interface createPostResponse {}
export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// Comment APIs

// Like APIs

// User APIs
