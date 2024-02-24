import { Order } from './orders.model';

export interface CreateOrder extends Omit<Order, 'orderId'> {}

export interface IOrder extends Order {}
export interface OrderID extends Pick<Order, 'orderId'> {}
