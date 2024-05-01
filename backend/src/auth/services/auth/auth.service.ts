import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDto } from 'src/users/schemas/users.dto';

import { UsersService } from './../../../users/services/users/users.service';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByAttribute<UserDto['id']>(
      email,
      'email',
    );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
