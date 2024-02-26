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
import { ResponseModel } from 'src/base.model';
import { UsersService } from 'src/services/users/users.service';
import { SignUpUserDto, UpdateUserDto, UserDto } from 'src/dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ResponseModel<UserDto[]> {
    const users = this.usersServices.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: users,
    };
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('userId', ParseUUIDPipe) userId: UserDto['userId'],
  ): ResponseModel<UserDto> {
    const user = this.usersServices.findByAttribute<UserDto['userId']>(
      userId,
      'userId',
    );
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: SignUpUserDto): ResponseModel<UserDto> {
    const newUser = this.usersServices.create(body);
    return {
      statusCode: HttpStatus.CREATED,
      data: newUser,
    };
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('userId', ParseUUIDPipe) userId: UserDto['userId'],
    @Body() changes: UpdateUserDto,
  ): ResponseModel<UserDto> {
    const editUser = this.usersServices.update(userId, changes);

    return {
      statusCode: HttpStatus.OK,
      data: editUser,
    };
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('userId', ParseUUIDPipe) userId: UserDto['userId']): void {
    this.usersServices.delete(userId);
  }
}
