import { User } from '../users/users.model';
import { Customer } from './customers.model';

export interface CreateCustomer extends Omit<Customer, 'customerId'> {
  user: Pick<User, 'email' | 'password'>;
}
export interface ICustomer extends Customer {}
