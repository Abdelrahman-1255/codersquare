import { Like } from "../types";

export interface LikeDao {
  addLike(like: Like): Promise<void>;
  removeLike(likeId: string): Promise<void>;
  getLikesByPostId(postId: string): Promise<Like[]>;
}