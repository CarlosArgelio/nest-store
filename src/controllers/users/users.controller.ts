import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('')
  getUsers() {}

  @Get(':userId')
  getUniqueUser(@Param() userId: string) {
    return userId;
  }

  @Get(':userId/orders')
  getUserInOrders(@Param() userId: string) {
    return userId;
  }

  @Post('')
  postUsers() {}

  @Put(':userId')
  putUsers(@Param() userId: string) {
    return userId;
  }

  @Delete(':userId')
  deleteUsers(@Param() userId: string) {
    return userId;
  }
}
