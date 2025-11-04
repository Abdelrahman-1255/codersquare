import { Like } from "../types";

export interface LikeDao {
  addLike(like: Like): void;
  removeLike(likeId: string): void;
  getLikesByPostId(postId: string): Like[];
}