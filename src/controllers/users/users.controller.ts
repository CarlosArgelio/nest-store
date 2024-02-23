import {
  Body,
  Controller,
  Delete,
  Get,
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
} from './users.dtos';
import { ResponseModel } from 'src/base.model';
import { ROLE } from './users.model';

const responseFake = [
  {
    userId: '1',
    email: 'mai@mail.com',
    password: '123',
    role: ROLE.CUSTOMER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('users')
export class UsersController {
  @Get()
  findAll(): ResponseModel<IUsers[]> {
    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Get('/:userId')
  findOne(@Param() userId: UserID): ResponseModel<IUsers> {
    const response = {
      ...responseFake[0],
      userId: userId.userId,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post('/sign-up')
  create(@Body() body: CreateUser): ResponseModel<UserResponse> {
    delete body.password;
    return {
      statusCode: 200,
      data: body,
    };
  }

  @Put('/:userId')
  update(
    @Param() userId: UserID,
    @Body() changes: UpdateUser,
  ): ResponseModel<UserResponse> {
    const response = {
      ...responseFake[0],
      userId: userId.userId,
      ...changes,
    };
    delete response.password;
    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete('/:userId')
  delete(@Param() userId: UserID): ResponseModel<any> {
    console.log(userId.userId);
    return {
      statusCode: 204,
      data: 'remove',
    };
  }
}
