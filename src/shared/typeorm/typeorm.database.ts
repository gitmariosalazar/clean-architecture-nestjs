import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { envs } from 'src/settings';

export const CONFIG_DATABASE_TYPEORM = async () => {
  const logger = new Logger('TypeORM');
  try {
    logger.log('🛢️  Using TypeORM to connect database 🎉!');
    return await TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_hostname,
      port: envs.db_port,
      username: envs.db_username,
      password: envs.db_password,
      database: envs.db_database,
      autoLoadEntities: true,
    });
  } catch (error) {
    logger.error('Error connecting to MySQL database:', error.message);
    throw new Error('Failed to connect to MySQL database');
  }
};
