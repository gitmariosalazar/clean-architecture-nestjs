import { Module } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductController } from '../controller/product.controller';
import { DatabaseServiceMySQL } from 'src/shared/database/mysql.service';
import { ProductRepositoryMySQLImplementation } from '../repositories/mysql/repository/mysql-product.repository';

@Module({
  imports: [],
  controllers: [ProductController], // Registering the Controller
  providers: [
    ProductUseCaseService,
    DatabaseServiceMySQL,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryMySQLImplementation,
    },
  ],
})
export class ProductsModuleWithMySQL {}
