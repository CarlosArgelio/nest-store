import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { CustomerModel } from '../models/customers.entity';
import { ROLE, UserModel } from '../models/users.entity';

export class UserDto extends UserModel {}

export class SignUpUserDto extends OmitType(UserModel, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: '/234Alfon#_',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(ROLE)
  @ApiProperty({
    description: 'User role',
    example: 'costumer',
    enum: ROLE,
  })
  readonly role: ROLE;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'customer id',
  })
  readonly customerId: CustomerModel['id'];
}

export class UpdateUserDto extends PartialType(
  OmitType(SignUpUserDto, ['password', 'role']),
) {}

// export class UpdatePasswordDto extends PickType(User, ['password']) {
//   @IsString()
//   newPassword: string;
// }
