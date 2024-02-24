import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { CreateUser, IUsers, UpdateUser } from 'src/entities/users/users.dtos';
import { ROLE } from 'src/entities/users/users.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: IUsers[] = [];

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

  create(user: CreateUser): IUsers {
    const userId = uuidv4();
    const newUser = { ...user, userId };
    this.add(newUser);

    delete newUser.password;
    return newUser;
  }

  add(user: IUsers) {
    this.users.push(user);
    return user;
  }

  findAll(): IUsers[] {
    return this.users;
  }

  findOne(id: IUsers['userId']): IUsers {
    const index = this.users.findIndex((user) => user.userId === id);
    return this.users[index];
  }

  findOneByEmail(email: IUsers['email']) {
    const index = this.users.findIndex((user) => user.email === email);
    return this.users[index];
  }

  update(id: IUsers['userId'], changes: UpdateUser) {
    const index = this.users.findIndex((user) => user.userId === id);
    this.users[index] = {
      ...this.users[index],
      ...changes,
    };
    const response = this.users[index];
    delete response.password;
    return this.users[index];
  }

  delete(id: IUsers['userId']) {
    // const users = this.findOne(id);
    const index = this.users.findIndex((u) => u.userId === id);
    delete this.users[index];
    return id;
  }
}
