import { BaseClassModel } from 'src/base.model';
import { ProductDto } from 'src/products/schemas/products.dtos';
import { UserDto } from '../schemas/users.dtos';

export class OrderModel extends BaseClassModel {
  date: Date;
  user: UserDto;
  products: ProductDto[];
}
