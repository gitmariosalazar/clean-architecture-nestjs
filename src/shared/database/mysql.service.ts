import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import * as mysql from 'mysql2';
import { envs } from 'src/settings';

@Injectable()
export class DatabaseServiceMySQL implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseServiceMySQL.name);
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: envs.mysql_hostname,
      user: envs.mysql_username,
      database: envs.mysql_database,
      password: envs.mysql_password,
      port: envs.mysql_port,
    });
  }
  async onModuleInit() {
    await this.connectToMySQL();
  }
  async onModuleDestroy() {
    await this.close();
  }

  private async connectToMySQL(): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        this.connection.connect((err) => {
          if (err) {
            reject(err);
          } else {
            this.logger.log(`🛢️  Connected to MySQL successfully 🎉!`);
            resolve(true);
          }
        });
      });
    } catch (error) {
      this.logger.error(`Failed to connect to MySQL: ${error.message}`);
      throw new Error('Database connection failed');
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results) => {
        if (error) {
          this.logger.error(`Database query failed: ${error.message}`);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async close(): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        this.connection.end((err) => {
          if (err) {
            reject(err);
          } else {
            this.logger.log('MySQL connection closed successfully');
            resolve(true);
          }
        });
      });
    } catch (error) {
      this.logger.error(`Failed to close MySQL connection: ${error.message}`);
    }
  }
}
