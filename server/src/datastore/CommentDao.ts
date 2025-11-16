import { Comment } from '../types';

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  getCommentsByPostId(postId: string): Promise<Comment[]>;
  updateComment(id: string, comment: Partial<Comment>): Promise<Comment | null>;
  deleteComment(id: string): Promise<void>;
}
