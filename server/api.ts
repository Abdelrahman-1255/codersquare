import { Post, User } from './types';

// post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface createPostResponse {}
export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// Comment APIs

// Like APIs

// User APIs

export type SignUpRequest = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'username' | 'password'
>;

export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}

export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>;
  jwt: string;
};
