import { ProductDto } from 'src/products/schemas/products.dto';

import { UserDto } from '../schemas/users.dto';

export class OrderModel {
  date: Date;
  user: UserDto;
  products: ProductDto[];
}
