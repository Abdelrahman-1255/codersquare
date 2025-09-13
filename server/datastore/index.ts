import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { InMemoryDatastore } from './memorydb';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export const db = new InMemoryDatastore();
