import { User } from '../users/users.model';
import { Customer } from './customers.model';

export interface CreateCustomer extends Customer {
  user: Pick<User, 'email' | 'password'>;
}
