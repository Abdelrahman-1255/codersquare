import { Post, User } from "./types";

// Post APIs
export interface GetPostsResponse {
    posts: Post[];
}
export interface GetPostsRequest {}
export type CreatePostRequest  =Pick<Post, "title" | "url" >;
export interface CreatePostResponse {
}
// User APIs
export type SignUpRequest = Pick<User, "firstName" | "lastName" | "username" | "email" | "password">;
export interface SignUpResponse {
    jwt: string;
}

export interface SignInRequest {
    login: string; //username or email
    password: string;
}
export type SignInResponse = {
    user:Pick<User, "id" | "firstName" | "lastName" | "username" | "email"> ;
    jwt: string;
}
// Like APIs

// Comment APIs
