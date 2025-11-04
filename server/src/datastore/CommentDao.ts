import { Comment } from '../types';

export interface CommentDao {
  createComment(comment: Comment): void;
  getCommentsByPostId(postId: string): Comment[];
  updateComment(id: string, comment: Partial<Comment>): Comment | null;
  deleteComment(id: string): void;
}
