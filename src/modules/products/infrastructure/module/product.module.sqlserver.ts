import { Module } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductController } from '../controller/product.controller';
import { DataserviceSQLServer } from 'src/shared/database/sqlserver.service';
import { ProductRepositorySQLServerImplementation } from '../repositories/sqlserver/repository/sqlserver-product.repository';

@Module({
  imports: [],
  controllers: [ProductController], // Registering the Controller
  providers: [
    ProductUseCaseService,
    DataserviceSQLServer, // Use the DataserviceSQLServer if you using PostgreSQL (pg)
    {
      provide: 'ProductRepository',
      useClass: ProductRepositorySQLServerImplementation,
    },
  ],
})
export class ProductsModuleWithSQLServer {}
