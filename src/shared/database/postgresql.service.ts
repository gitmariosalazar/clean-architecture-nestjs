import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { envs } from 'src/settings';

@Injectable()
export class DatabaseServicePostgreSQL
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseServicePostgreSQL.name);
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: envs.db_username,
      host: envs.db_hostname,
      password: envs.db_password,
      database: envs.db_database,
      port: envs.db_port,
    });
  }

  async onModuleInit() {
    await this.connectToPostgreSQL();
  }
  async onModuleDestroy() {
    await this.close();
  }

  public async connectToPostgreSQL(): Promise<void> {
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('🛢️ Connected to PostgreSQL successfully 🎉!');
    } catch (error) {
      this.logger.error(
        `Failed to connect to PostgreSQL: ${error.message}`,
        error.stack,
      );
      throw new Error('Database connection failed');
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      this.logger.error(`Database query failed: ${error.message}`, error.stack);
      throw new Error('Database query failed');
    }
  }

  async close(): Promise<void> {
    try {
      await this.pool.end();
      this.logger.log('Database connection closed successfully');
    } catch (error) {
      this.logger.error(
        `Failed to close database connection: ${error.message}`,
        error.stack,
      );
    }
  }
}
