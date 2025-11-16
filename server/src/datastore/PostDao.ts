import { Post } from "../types";
export interface PostDao {
  createPost(post: Post): Promise<void>;
  listPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | null>;
  getPostsByAuthorId(authorId: string): Promise<Post[]>;
  updatePost(id: string, post: Partial<Post>): Promise<Post | null>;
  deletePost(id: string): Promise<void>;
}