/* eslint-disable import/namespace */
import * as Joi from 'joi';

import { Environment } from './enviroments';
export const validationEnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .equal(Environment.Development, Environment.Production, Environment.Staging)
    .required(),
  API_KEY: Joi.number(),
  PGADMIN_EMAIL: Joi.string().email(),
  PGADMIN_PASSWORD: Joi.string(),
  PGADMIN_PORT_INSTANCE: Joi.number(),
  PGADMIN_PORT_IMAGE: Joi.number(),
  POSTGRES_DB: Joi.string(),
  POSTGRES_PORT: Joi.number(),
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_USER: Joi.string(),
  MYSQL_DB: Joi.string(),
  MYSQL_PORT: Joi.number(),
  MYSQL_HOST: Joi.string(),
  MYSQL_PASSWORD: Joi.string(),
  MYSQL_USER: Joi.string(),
});
