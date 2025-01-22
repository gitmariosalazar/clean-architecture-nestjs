import { Module } from '@nestjs/common';
import { UsersController } from '../controller/user.controller';
import { UserUseCaseService } from '../../application/service/user-use-case.service';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { UserRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma-user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserUseCaseService,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrismaImplementation,
    }
  ]
})
export class UserModuleWithPrisma {}