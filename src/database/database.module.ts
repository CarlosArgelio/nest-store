import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from './../config';

export enum env {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_XYZ';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === env.production ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database, host, user, password, port } = configService.postgres;
        // port.toString();
        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });

        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
