import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private readonly apiKey: string,
    @Inject('PG') private readonly pg: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    console.log(apiKey);

    return `Hello World! ${apiKey}`;
  }

  getHous() {
    return new Promise((resolve, reject) => {
      this.pg.query('SELECT NOW()', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
