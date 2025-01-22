import { Injectable, Logger } from '@nestjs/common';
import * as mssql from 'mssql';
import { envs } from 'src/settings';

@Injectable()
export class DataserviceSQLServer {
  private readonly poolPromise: mssql.IMssqlConnectionPool;
  private readonly logger = new Logger(DataserviceSQLServer.name);

  constructor() {
    const config: mssql.config = {
      user: envs.sqlserver_username,
      password: envs.sqlserver_password,
      server: envs.sqlserver_hostname,
      database: envs.sqlserver_database,
      port: envs.sqlserver_port,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    };

    this.poolPromise = mssql
      .connect(config)
      .then((pool) => {
        this.logger.log(`🛢️  Connected to SQL Server successfully 🎉!`);
        return pool;
      })
      .catch((error) => {
        this.logger.error(`Failed to connect to SQL Server: ${error.message}`);
        throw error;
      });
  }
  async query<T>(sql: string, params?: Record<string, any>): Promise<T[]> {
    const pool = await this.poolPromise;
    const request = pool.request();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });
    }

    const result = await request.query(sql);
    return result.recordset;
  }
}
