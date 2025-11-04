import { Post } from "../types";
export interface PostDao {
  createPost(post: Post): void;
  listPosts(): Post[];
  getPostById(id: string): Post | null;
  getPostsByAuthorId(authorId: string): Post[];
  updatePost(id: string, post: Partial<Post>): Post | null;
  deletePost(id: string): void;
}