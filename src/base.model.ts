export interface BaseModel {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ResponseModel<T> {
  statusCode: number;
  data: T;
}

export class BaseClassModel {
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
}
