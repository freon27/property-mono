import { Provider } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { Schema, schema } from './schema';

export const PG_CONNECTION = 'PG_CONNECTION';

export const DrizzleProvider: Provider = {
  provide: PG_CONNECTION,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<{ DATABASE_URL: string }>) => {
    const pool = new Pool({
      connectionString: configService.get('DATABASE_URL'),
    });
    return drizzle(pool, { schema, logger: true }) as NodePgDatabase<Schema>;
  },
};
