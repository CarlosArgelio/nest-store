import { BaseClassModel } from 'src/base.model';
import { ProductDto } from 'src/products/schemas/products.dto';
import { UserDto } from '../schemas/users.dto';

export class OrderModel extends BaseClassModel {
  date: Date;
  user: UserDto;
  products: ProductDto[];
}
