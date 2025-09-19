import { open as sqliteOpen, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Datastore } from '../index.js';
import { User, Post, Like, Comment } from '../../types.js';
import path from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    this.db = await sqliteOpen({
      // open the database
      filename: path.join(process.cwd(), 'codersquare.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: 'C:\\Users\\Abdo\\codersquare\\server\\datastore\\sql\\migrations',
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, firstName, lastName, username, email, password) VALUES (?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.password
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE email = ?', email);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE id = ?', id);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE username = ?', username);
  }
  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id, title, url,  postedAt, userId) VALUES (?,?,?,?,?)',
      post.id,
      post.title,
      post.url,
      post.posteAt,
      post.userId
    );
  }
  getPost(id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
