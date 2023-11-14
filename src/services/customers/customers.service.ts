import { Injectable } from '@nestjs/common';
import {
  CreateCustomersDto,
  UpdateCustomersDto,
} from 'src/dtos/customers/customers.dtos';
import { Customer } from 'src/entities/customers.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      lastName: 'XXX',
      phone: '300300300',
      address: 'Calle 123',
      email: 'email@email.com',
    },
  ];
  categories: any;

  findAll() {
    const categories = this.customers;
    return categories;
  }

  findOne(id: number) {
    const categories = this.customers.find((item) => item.id === id);
    return categories;
  }

  create(payload: CreateCustomersDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomersDto) {
    const customer = this.findOne(id);
    const index = this.customers.indexOf(customer);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  delete(id: number) {
    const customer = this.findOne(id);
    const index = this.customers.indexOf(customer);
    this.customers.splice(index, 1);
    return true;
  }
}
