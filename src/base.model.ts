export interface BaseModel {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ResponseModel<T> {
  statusCode: number;
  data: T;
}
