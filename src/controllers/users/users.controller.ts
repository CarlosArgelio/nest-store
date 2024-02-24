import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUser,
  UserResponse,
  IUsers,
  UpdateUser,
  UserID,
} from '../../entities/users/users.dtos';
import { ResponseModel } from 'src/base.model';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ResponseModel<IUsers[]> {
    const users = this.usersServices.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: users,
    };
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() userId: UserID['userId']): ResponseModel<IUsers> {
    const user = this.usersServices.findOne(userId);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUser): ResponseModel<UserResponse> {
    const newUser = this.usersServices.create(body);
    return {
      statusCode: HttpStatus.CREATED,
      data: newUser,
    };
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() userId: UserID['userId'],
    @Body() changes: UpdateUser,
  ): ResponseModel<UserResponse> {
    const editUser = this.usersServices.update(userId, changes);

    return {
      statusCode: HttpStatus.OK,
      data: editUser,
    };
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() userId: UserID['userId']): ResponseModel<any> | void {
    this.usersServices.delete(userId);
  }
}
