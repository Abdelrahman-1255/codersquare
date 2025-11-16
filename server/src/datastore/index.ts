import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { InMemoryDB } from "./memorydb";
import { PostDao } from "./PostDao";
import { sqlDatastore } from "./sql";
import { UserDao } from "./UserDao";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: DataStore;

export async function initDb() {
    // db = new InMemoryDB();
    db = await new sqlDatastore().openDb();
}