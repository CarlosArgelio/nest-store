// import { UserDto } from 'src/users/schemas/users.dto';
import { CostumerModel } from 'src/users/models/costumers.entity';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
export class CreateCostumerDto extends OmitType(CostumerDto, ['customerId']) {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
