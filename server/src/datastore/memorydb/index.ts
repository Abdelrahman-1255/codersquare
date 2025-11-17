import { DataStore } from "../index";
import { User, Post, Comment, Like } from "../../types";

export class InMemoryDB implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.username === username));
    }
    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }
    updateUser(id: string, user: Partial<User>): Promise<User | null> {
        const existingUser = this.users.find(user => user.id === id);
        if (existingUser) {
            Object.assign(existingUser, user);
            return Promise.resolve(existingUser);
        }
        return Promise.resolve(null);
    }
    deleteUser(id: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
        return Promise.resolve();
    }
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    getPostById(id: string): Promise<Post | null> {
        return Promise.resolve(this.posts.find(post => post.id === id) ?? null);
    }
    getPostsByAuthorId(authorId: string): Promise<Post[]> {
        return Promise.resolve(this.posts.filter(post => post.userId === authorId));
    }
    updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
        const existingPost = this.posts.find(p => p.id === id);
        if (existingPost) {
            Object.assign(existingPost, post);
            return Promise.resolve(existingPost);
        }
        return Promise.resolve(null);
    }
    deletePost(id: string): Promise<void> {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            this.posts.splice(postIndex, 1);
        }
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    getCommentsByPostId(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(comment => comment.postId === postId));
    }
    updateComment(id: string, comment: Partial<Comment>): Promise<Comment | null> {
        const existingComment = this.comments.find(c => c.id === id);
        if (existingComment) {
            Object.assign(existingComment, comment);
            return Promise.resolve(existingComment);
        }
        return Promise.resolve(null);
    }
    deleteComment(id: string): Promise<void> {
       const commentIndex = this.comments.findIndex(comment => comment.id === id);
       if (commentIndex !== -1) {
           this.comments.splice(commentIndex, 1);
       }
       return Promise.resolve();
    }
    addLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    removeLike(likeId: string): Promise<void> {
        const likeIndex = this.likes.findIndex(like => like.id === likeId);
        if (likeIndex !== -1) {
            this.likes.splice(likeIndex, 1);
        }
        return Promise.resolve();
    }
    getLikesByPostId(postId: string): Promise<Like[]> {
        return Promise.resolve(this.likes.filter(like => like.postId === postId));
    }
}