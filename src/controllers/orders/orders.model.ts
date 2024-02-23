import { BaseModel } from 'src/base.model';

export interface Order extends BaseModel {
  orderId: string;
  productId: string;
  customerId: string;
  amount: number;
}
