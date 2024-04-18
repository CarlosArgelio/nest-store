import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

import { BaseClassDto } from 'src/base.model';

export class OrderItemDto extends BaseClassDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  readonly orderId: string;

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive({
    message: 'Quantity must be positive',
  })
  @Min(1)
  @IsNotEmpty()
  readonly quantity: number;
}

export class CreateOrderItemDto extends OmitType(OrderItemDto, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
export class UpdateOrderItemDto extends PartialType(OrderItemDto) {}
