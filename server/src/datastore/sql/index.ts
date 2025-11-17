import {  open as sqliteOpen, Database } from "sqlite";
import sqlite3 from "sqlite3";

import { DataStore } from "..";
import { User, Post, Comment, Like } from "../../types";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class sqlDatastore implements DataStore {
    private db!: Database<sqlite3.Database,sqlite3.Statement>;
    public async openDb() {
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database
        });
        await this.db.run("PRAGMA foreign_keys = ON");

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
      
        })

        return this;
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(
            `INSERT INTO users (id, firstName, lastName, username, email, password) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user.id, user.firstName, user.lastName, user.username, user.email, user.password]
        );
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );
    }
    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
    }
    updateUser(id: string, user: Partial<User>): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createPost(post: Post): Promise<void> {
       await this.db.run(
           `INSERT INTO posts (id, title, url, userId, postedAt) 
            VALUES (?, ?, ?, ?, ?)`,
           [post.id, post.title, post.url, post.userId, post.postedAt]
       );
    }
    listPosts(): Promise<Post[]> {
       return this.db.all<Post[]>("SELECT * FROM posts");
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