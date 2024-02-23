import { BaseModel } from 'src/base.model';

export interface User extends BaseModel {
  name: string;
  secondeName?: string;
  lastName: string;
  secondName?: string;
  email: string;
  password: string;
}
