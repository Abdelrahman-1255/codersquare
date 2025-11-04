import { DataStore } from "../index";
import { User, Post, Comment, Like } from "../../types";

export class InMemoryDB implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }
    updateUser(id: string, user: Partial<User>): User | null {
        const existingUser = this.users.find(user => user.id === id);
        if (existingUser) {
            Object.assign(existingUser, user);
            return existingUser;
        }
        return null;
    }
    deleteUser(id: string): void {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }
    createPost(post: Post): void {
        this.posts.push(post);
    }
    listPosts(): Post[] {
        return this.posts;
    }
    getPostById(id: string): Post | undefined {
        return this.posts.find(post => post.id === id);
    }
    getPostsByAuthorId(authorId: string): Post[] {
        return this.posts.filter(post => post.userId === authorId);
    }
    updatePost(id: string, post: Partial<Post>): Post | null {
        const existingPost = this.posts.find(p => p.id === id);
        if (existingPost) {
            Object.assign(existingPost, post);
            return existingPost;
        }
        return null;
    }
    deletePost(id: string): void {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            this.posts.splice(postIndex, 1);
        }
    }
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    getCommentsByPostId(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }
    updateComment(id: string, comment: Partial<Comment>): Comment | null {
        const existingComment = this.comments.find(c => c.id === id);
        if (existingComment) {
            Object.assign(existingComment, comment);
            return existingComment;
        }
        return null;
    }
    deleteComment(id: string): void {
       const commentIndex = this.comments.findIndex(comment => comment.id === id);
       if (commentIndex !== -1) {
           this.comments.splice(commentIndex, 1);
       }
    }
    addLike(like: Like): void {
        this.likes.push(like);
    }
    removeLike(likeId: string): void {
        const likeIndex = this.likes.findIndex(like => like.id === likeId);
        if (likeIndex !== -1) {
            this.likes.splice(likeIndex, 1);
        }
    }
    getLikesByPostId(postId: string): Like[] {
        return this.likes.filter(like => like.postId === postId);
    }
}