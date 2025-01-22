

import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/settings';
import { Logger } from '@nestjs/common';

export const CONFIG_DATABASE_MONGODB = () => {
  const logger = new Logger(CONFIG_DATABASE_MONGODB.name);
  try {
    logger.log(`🛢️  Connected to Mongo DB successfully 🎉!`);
    return MongooseModule.forRoot(envs.mongo_uri, {});
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
    throw new Error('Database connection error');
  }
};
