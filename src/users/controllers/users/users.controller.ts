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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: UserDto['id'],
  ): Promise<ResponseModel<UserDto>> {
    const user = await this.usersServices.findByAttribute<UserDto['id']>(
      id,
      'id',
    );
    return { statusCode: HttpStatus.OK, data: user };
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: SignUpUserDto): Promise<ResponseModel<UserDto>> {
    const newUser = await this.usersServices.create(body);
    return { statusCode: HttpStatus.CREATED, data: newUser };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: UserDto['id'],
    @Body() changes: UpdateUserDto,
  ): Promise<ResponseModel<UserDto>> {
    const editUser = await this.usersServices.update(id, changes);
    return { statusCode: HttpStatus.OK, data: editUser };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
  })
  async delete(@Param('id', ParseUUIDPipe) id: UserDto['id']) {
    await this.usersServices.delete(id);
  }

  @Get('/:id/orders')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async getOrders(
    @Param('id', ParseUUIDPipe) id: UserDto['id'],
  ): Promise<ResponseModel<OrderDto>> {
    const orders = await this.usersServices.getOrders(id);
    return {
      statusCode: HttpStatus.OK,
      data: orders,
    };
  }
}
