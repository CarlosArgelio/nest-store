import { registerAs } from '@nestjs/config';

import { Environment } from './enviroments';

const enviroment = process.env.NODE_ENV;

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
  },
  postgres: {
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    type: 'postgres',
  },
  mysql: {
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    type: 'mysql',
  },
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  enviroment: enviroment,
  isDev: enviroment ? Environment.Development : false,
  isStg: enviroment ? Environment.Staging : false,
  isProd: enviroment ? Environment.Production : false,
}));
