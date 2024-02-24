import { User } from './users.model';

export interface CreateUser extends Omit<User, 'userId'> {}
export interface UserResponse extends Omit<CreateUser, 'password'> {}
export interface UpdateUser extends Partial<Omit<CreateUser, 'password'>> {}
export interface IUsers extends User {}
export interface UserID extends Pick<User, 'userId'> {}
