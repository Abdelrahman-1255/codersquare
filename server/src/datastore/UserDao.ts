import { User } from '../types';
export interface UserDao {
  createUser(user: User): void;
  getUserByEmail(email: string): User | undefined;
  getUserByUsername(username: string): User | undefined;
  updateUser(id: string, user: Partial<User>): User | null;
  deleteUser(id: string): void;
}