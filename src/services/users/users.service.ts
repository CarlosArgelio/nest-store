import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpUserDto, UpdateUserDto, UserDto } from 'src/dtos/users.dtos';
import { ROLE } from 'src/models/users.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: UserDto[] = [];

  constructor() {
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
}
