import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../models/entities/product.entity';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductRepositoryTypeORMImplementation } from '../repositories/typeorm/repository/orm-product.repository';
import { ProductController } from '../controller/product.controller';
import { CONFIG_DATABASE_TYPEORM } from 'src/shared/typeorm/typeorm.database';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CONFIG_DATABASE_TYPEORM(),
  ],
  controllers: [ProductController], // Registering the Controller
  providers: [
    ProductUseCaseService, // Provider of use case
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryTypeORMImplementation,
    },
  ],
})
export class ProductsModuleWithTypeORM {}
