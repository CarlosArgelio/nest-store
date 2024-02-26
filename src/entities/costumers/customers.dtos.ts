import { UserDto } from 'src/dtos/users.dtos';
import { Customer } from './customers.model';

export interface CreateCustomer extends Omit<Customer, 'customerId'> {
  user: Pick<UserDto, 'email' | 'password'>;
}
export interface ICustomer extends Customer {}
export interface CustomerID extends Pick<Customer, 'customerId'> {}
