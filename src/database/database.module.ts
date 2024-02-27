import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.error('🚀 ~ client.query ~ err:', err);
//   console.log('🚀 ~ client.query ~ res rows:', res.rows);
// });

export enum env {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_XYZ';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === env.production ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
