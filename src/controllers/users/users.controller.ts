import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  @Post('/sign-up')
  createUser(@Body() body: User) {
    delete body.password;
    return body;
  }
}
