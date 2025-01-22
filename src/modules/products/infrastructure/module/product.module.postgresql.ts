import { Module } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductController } from '../controller/product.controller';
import { DatabaseServicePostgreSQL } from 'src/shared/database/postgresql.service';
import { ProductRepositoryPostgresImplementation } from '../repositories/postgresql/repository/pg-product.repository';

@Module({
  imports: [],
  controllers: [ProductController], // Registering the Controller
  providers: [
    ProductUseCaseService, // Provider of use case
    DatabaseServicePostgreSQL,
    {
      provide: 'ProductRepository', // Repository Injection
      useClass: ProductRepositoryPostgresImplementation,
    },
  ],
})
export class ProductsModuleWithPostgreSQL {}
