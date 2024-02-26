import { UserDto } from 'src/dtos/users.dtos';
import { CostumerModel } from 'src/models/costumers.model';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CostumerDto extends CostumerModel {}
export class CreateCostumerDto extends OmitType(CostumerDto, ['customerId']) {
  user: Pick<UserDto, 'email' | 'password'>;
}
export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
