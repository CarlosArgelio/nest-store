import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import { OrderDto } from 'src/users/schemas/orders.dto';
import {
  SignUpUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/users/schemas/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseModel<UserDto[]>> {
    const users = await this.usersServices.findAll();
    return { statusCode: HttpStatus.OK, data: users };
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
  })
  async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserDto['userId'],
  ): Promise<ResponseModel<UserDto>> {
    const user = await this.usersServices.findByAttribute<UserDto['userId']>(
      userId,
      'userId',
    );
    return { statusCode: HttpStatus.OK, data: user };
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: SignUpUserDto): Promise<ResponseModel<UserDto>> {
    const newUser = await this.usersServices.create(body);
    return { statusCode: HttpStatus.CREATED, data: newUser };
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
  })
  async update(
    @Param('userId', ParseUUIDPipe) userId: UserDto['userId'],
    @Body() changes: UpdateUserDto,
  ): Promise<ResponseModel<UserDto>> {
    const editUser = await this.usersServices.update(userId, changes);
    return { statusCode: HttpStatus.OK, data: editUser };
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'userId',
  })
  async delete(@Param('userId', ParseUUIDPipe) userId: UserDto['userId']) {
    await this.usersServices.delete(userId);
  }

  @Get('/:userId/orders')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'userId',
  })
  async getOrders(
    @Param('userId', ParseUUIDPipe) userId: UserDto['userId'],
  ): Promise<ResponseModel<OrderDto>> {
    const orders = await this.usersServices.getOrders(userId);
    return {
      statusCode: HttpStatus.OK,
      data: orders,
    };
  }
}
