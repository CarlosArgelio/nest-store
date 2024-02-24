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
  @HttpCode(HttpStatus.OK)
  findAll(): ResponseModel<IUsers[]> {
    return {
      statusCode: HttpStatus.OK,
      data: responseFake,
    };
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() userId: UserID['userId']): ResponseModel<IUsers> {
    const response = {
      ...responseFake[0],
      userId: userId,
    };

    return {
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUser): ResponseModel<UserResponse> {
    delete body.password;
    return {
      statusCode: HttpStatus.CREATED,
      data: body,
    };
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() userId: UserID['userId'],
    @Body() changes: UpdateUser,
  ): ResponseModel<UserResponse> {
    const response = {
      ...responseFake[0],
      userId: userId,
      ...changes,
    };
    delete response.password;
    return {
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() userId: UserID['userId']): ResponseModel<any> {
    console.log(userId);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      data: 'remove',
    };
  }
}
