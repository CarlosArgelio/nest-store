import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { ProductsService } from 'src/products/services/products/products.service';
import { ROLE } from 'src/users/models/users.entity';
import { OrderDto } from 'src/users/schemas/orders.dto';
import {
  SignUpUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/users/schemas/users.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = null;

  constructor(
    private productsServices: ProductsService,
    private configService: ConfigService,
  ) {
    this.users = [];
    for (let i = 0; i < 5; i++) {
      this.users.push({
        userId: faker.datatype.uuid(),
        email: faker.internet.email(),
        role: ROLE.CUSTOMER,
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }
  }

  findAll(): UserDto[] {
    const apiKey = this.configService.get('API_KEY');
    console.log('🚀 ~ UsersService ~ findAll ~ apiKey:', apiKey);

    const users = this.users;
    if (users.length === 0) {
      throw new NotFoundException();
    }
    return users;
  }

  findByAttribute<T>(value: T, attr: T) {
    const findUser = this.users.find((user) => user[`${attr}`] === value);

    if (!findUser) {
      throw new NotFoundException();
    }
    return findUser;
  }

  // findOne(id: IUsers['userId']): IUsers {
  //   const index = this.users.findIndex((user) => user.userId === id);
  //   return this.users[index];
  // }

  // findOneByEmail(email: IUsers['email']) {
  //   const index = this.users.findIndex((user) => user.email === email);
  //   return this.users[index];
  // }

  create(user: SignUpUserDto): UserDto {
    const userId = uuidv4();
    const newUser = {
      ...user,
      userId,
      createdAt: new Date(),
    };
    this.add(newUser);

    delete newUser.password;
    return newUser;
  }

  add(user: UserDto): void {
    this.users.push(user);
  }

  update(id: UserDto['userId'], changes: UpdateUserDto) {
    // validate attr userID
    this.findByAttribute<UserDto['userId']>(id, 'userId');

    const index = this.users.findIndex((user) => user.userId === id);
    this.users[index] = {
      ...this.users[index],
      ...changes,
    };
    const response = this.users[index];
    delete response.password;
    return this.users[index];
  }

  delete(id: UserDto['userId']): void {
    this.findByAttribute<UserDto['userId']>(id, 'userId');

    const index = this.users.findIndex((u) => u.userId === id);
    this.users.splice(index, 1);
  }

  async getOrders(userId: UserDto['userId']): Promise<OrderDto> {
    const user = this.findByAttribute<UserDto['userId']>(userId, 'userId');
    const products = await this.productsServices.findAll();
    const response = {
      date: new Date(),
      user,
      products,
    };
    return response;
  }
}
