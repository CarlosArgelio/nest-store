import { registerAs } from '@nestjs/config';

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
  },
  mysql: {
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
  },
  apiKey: process.env.API_KEY,
}));
