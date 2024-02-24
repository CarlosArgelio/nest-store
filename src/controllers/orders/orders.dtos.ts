import { Order } from './orders.model';

export interface CreateOrder
  extends Omit<Order, 'productId' | 'orderId' | 'amount'> {}

export interface AddItemToOrder extends Omit<Order, 'customerId'> {}
export interface IOrder extends Order {}
export interface OrderID extends Pick<Order, 'orderId'> {}
