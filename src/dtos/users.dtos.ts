import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE, User } from 'src/models/users.model';

export class UserDto extends User {}

export class SignUpUserDto extends OmitType(User, [
  'userId',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(ROLE)
  readonly role: ROLE;
}

export class UpdateUserDto extends PartialType(
  OmitType(SignUpUserDto, ['password']),
) {}

// export class UpdatePasswordDto extends PickType(User, ['password']) {
//   @IsString()
//   newPassword: string;
// }
