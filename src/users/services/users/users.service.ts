import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    let users = null;
    try {
      users = await this.userRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async findByAttribute<T>(value: T, attr: T) {
    let user = null;
    let options = {};
    options[`${attr}`] = value;

    try {
      user = await this.userRepo.findOne({ where: options });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async create(user: SignUpUserDto): Promise<UserDto> {
    const userId = uuidv4();
    const newUser = {
      ...user,
      userId,
    };

    try {
      this.userRepo.create(newUser);
      const saveUser = await this.userRepo.save(newUser);

      delete saveUser.password;
      return saveUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: UserDto['userId'],
    changes: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.findByAttribute<UserDto['userId']>(id, 'userId');

    try {
      this.userRepo.merge(user, changes);
      const updateUser = await this.userRepo.save(user);

      delete updateUser.password;
      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: UserDto['userId']): Promise<void> {
    await this.findByAttribute<UserDto['userId']>(id, 'userId');

    try {
      await this.userRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
