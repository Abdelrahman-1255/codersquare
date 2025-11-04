import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { InMemoryDB } from "./memorydb";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemoryDB();