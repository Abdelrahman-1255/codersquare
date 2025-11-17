import { User } from '../types';
export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}