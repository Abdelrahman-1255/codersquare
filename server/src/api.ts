import { Post } from "./types";

// Post APIs
export interface GetPostsResponse {
    posts: Post[];
}
export interface GetPostsRequest {}
export type CreatePostRequest  =Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {
}
// User APIs

// Like APIs

// Comment APIs
