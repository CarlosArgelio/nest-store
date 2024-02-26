import { UserDto } from 'src/users/schemas/users.dto';
import { CostumerModel } from 'src/users/models/costumers.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CostumerDto extends CostumerModel {}
export class CreateCostumerDto extends OmitType(CostumerDto, ['customerId']) {
  user: Pick<UserDto, 'email' | 'password'>;
}
export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
