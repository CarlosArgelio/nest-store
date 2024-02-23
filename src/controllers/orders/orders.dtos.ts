import { Order } from './orders.model';

export interface CreateOrder
  extends Omit<Order, 'productId' | 'orderId' | 'amount'> {}

export interface AddItemToOrder extends Omit<Order, 'customerId'> {}
