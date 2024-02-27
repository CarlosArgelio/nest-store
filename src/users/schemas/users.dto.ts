import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE, User } from '../models/users.entity';

export class UserDto extends User {}

export class SignUpUserDto extends OmitType(User, [
  'userId',
  'createdAt',
  'updatedAt',
  'deletedAt',
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
}

export class UpdateUserDto extends PartialType(
  OmitType(SignUpUserDto, ['password', 'role']),
) {}

// export class UpdatePasswordDto extends PickType(User, ['password']) {
//   @IsString()
//   newPassword: string;
// }
