import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UserModel } from './../../../users/models/users.entity';
import { AuthService } from './../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@Req() req: Request) {
    const user = req.user as UserModel;
    return this.authService.generateJwt(user);
  }
}
