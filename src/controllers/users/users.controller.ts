import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './users.dtos';

@Controller('users')
export class UsersController {
  @Post('/sign-up')
  createUser(@Body() body: CreateUser) {
    delete body.password;
    return body;
  }
}
