import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { FilterDto } from 'src/base.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { UserModel } from 'src/users/models/users.entity';
import { CustomerDto } from 'src/users/schemas/customers.dto';
import { GetOrders } from 'src/users/schemas/orders.dto';
import {
  SignUpUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/users/schemas/users.dto';

import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsServices: ProductsService,
    @InjectRepository(UserModel) private userRepo: Repository<UserModel>,
    private customersServices: CustomersService,
  ) {}

  async findAll(params?: FilterDto): Promise<UserDto[]> {
    let users = null;
    try {
      if (params !== undefined) {
        const { limit, offset } = params;
        users = await this.userRepo.find({
          take: limit,
          skip: offset,
          relations: ['customer'],
        });
      } else {
        users = await this.userRepo.find({
          relations: ['customer'],
        });
      }
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
    const options = {};
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
    try {
      const newUser = this.userRepo.create(user);
      const hasPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hasPassword;

      if (user.customerId) {
        const customer = await this.customersServices.findByAttr<
          CustomerDto['id']
        >(user.customerId, 'id');
        newUser.customer = customer;
      }
      const saveUser = await this.userRepo.save(newUser);

      return saveUser;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ create ~ error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: UserDto['id'], changes: UpdateUserDto): Promise<UserDto> {
    const user = await this.findByAttribute<UserDto['id']>(id, 'id');

    try {
      this.userRepo.merge(user, changes);
      const updateUser = await this.userRepo.save(user);

      delete updateUser.password;
      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: UserDto['id']): Promise<void> {
    await this.findByAttribute<UserDto['id']>(id, 'id');

    try {
      await this.userRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOrders(id: UserDto['id']): Promise<GetOrders> {
    const users = await this.findByAttribute<UserDto['id']>(id, 'id');
    const products = await this.productsServices.findAll();
    const response = {
      date: new Date(),
      users,
      products,
    };
    return response;
  }
}
