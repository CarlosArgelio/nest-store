import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber('VE')
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

// PartialType is a utility type that allows you to create a new type that is a copy of another type but with all of its properties set to optional.
export class UpdateCustomersDto extends PartialType(CreateCustomersDto) {}
