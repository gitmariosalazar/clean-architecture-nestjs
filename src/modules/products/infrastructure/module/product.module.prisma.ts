import { Module } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductController } from '../controller/product.controller';
import { ProductRepositoryPrismaImplementation } from '../repositories/prisma/repository/prisma-product.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ProductController], // Registering the Controller
  providers: [
    ProductUseCaseService,
    PrismaService, // Registering the PrismaService
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryPrismaImplementation,
    },
  ],
})
export class ProductsModuleWithPrisma {}
