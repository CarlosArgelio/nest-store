import { User } from './users.model';

export interface CreateUser extends Omit<User, 'userId'> {}
