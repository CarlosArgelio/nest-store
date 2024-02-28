import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ProductsService } from 'src/products/services/products/products.service';
import { OrderDto } from 'src/users/schemas/orders.dto';
import {
  SignUpUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/users/schemas/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/users/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsServices: ProductsService,
    @InjectRepository(UserModel) private userRepo: Repository<UserModel>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepo.find();
    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async findByAttribute<T>(value: T, attr: T) {
    let options = {};
    options[`${attr}`] = value;

    const findUser = await this.userRepo.findOne({ where: options });

    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return findUser;
  }

  async create(user: SignUpUserDto): Promise<UserDto> {
    const userId = uuidv4();
    const newUser = {
      ...user,
      userId,
    };

    this.userRepo.create(newUser);
    const saveUser = await this.userRepo.save(newUser);

    delete saveUser.password;
    return saveUser;
  }

  async update(
    id: UserDto['userId'],
    changes: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.findByAttribute<UserDto['userId']>(id, 'userId');

    this.userRepo.merge(user, changes);
    const updateUser = await this.userRepo.save(user);

    delete updateUser.password;
    return updateUser;
  }

  async delete(id: UserDto['userId']): Promise<void> {
    await this.findByAttribute<UserDto['userId']>(id, 'userId');
    await this.userRepo.delete(id);
  }

  async getOrders(userId: UserDto['userId']): Promise<OrderDto> {
    const user = await this.findByAttribute<UserDto['userId']>(
      userId,
      'userId',
    );
    const products = await this.productsServices.findAll();
    const response = {
      date: new Date(),
      user,
      products,
    };
    return response;
  }
}
