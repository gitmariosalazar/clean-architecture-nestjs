import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('🛢️  Successfully connected to the database using Prisma 🎉');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
      throw new Error('Database connection failed');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from the database');
    } catch (error) {
      this.logger.error('Failed to disconnect from the database', error);
      throw new Error('Database disconnection failed');
    }
  }

  /**
   * Adds a middleware to log queries for debugging.
   */
  enableQueryLogging() {
    this.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;

      this.logger.debug(
        `Query ${params.model}.${params.action} took ${duration}ms`,
      );
      return result;
    });
  }
}
