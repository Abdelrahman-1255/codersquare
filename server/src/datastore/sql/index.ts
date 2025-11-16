import {  open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";

import { DataStore } from "..";
import { User, Post, Comment, Like } from "../../types";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class sqlDatastore implements DataStore {
    public async openDb() {
        const db = await sqliteOpen({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database
        });

        await db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
      
        })

        return this;
    }

    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: string, user: Partial<User>): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    getPostById(id: string): Promise<Post | null> {
        throw new Error("Method not implemented.");
    }
    getPostsByAuthorId(authorId: string): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCommentsByPostId(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    updateComment(id: string, comment: Partial<Comment>): Promise<Comment | null> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    removeLike(likeId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLikesByPostId(postId: string): Promise<Like[]> {
        throw new Error("Method not implemented.");
    }
    
}