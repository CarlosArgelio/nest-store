import { BaseModel } from 'src/base.model';

export interface Customer extends BaseModel {
  customerId: string;
  name: string;
  lastName: string;
  phone: string;
}
