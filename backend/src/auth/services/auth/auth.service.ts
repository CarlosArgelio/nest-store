import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PayloadToken } from 'src/auth/models/token.models';
import { UserModel } from 'src/users/models/users.entity';
import { UserDto } from 'src/users/schemas/users.dto';

import { UsersService } from './../../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  generateJwt(user: UserModel) {
    const payload: PayloadToken = { role: user.role, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
