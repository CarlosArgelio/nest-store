// import { UserDto } from 'src/users/schemas/users.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { CostumerModel } from 'src/users/models/costumers.entity';

export class CostumerDto extends CostumerModel {
  @ApiProperty({
    description: 'Costumer name',
    example: 'Carlos Argelio',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Costumer last name',
    example: 'Palacios Ramos',
  })
  readonly lastName: string;

  @ApiProperty({
    description: 'Costumer phone',
    example: '+584129867974',
  })
  readonly phone: string;
}
export class CreateCostumerDto extends OmitType(CostumerDto, [
  'customerId',
  'createdAt',
  'updatedAt',
]) {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
