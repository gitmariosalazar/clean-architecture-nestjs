import { Module } from '@nestjs/common';

// import { ProductsModuleWithMongoDB } from './modules/products/infrastructure/module/product.module.mongodb';
// import { ProductsModuleWithMySQL } from './modules/products/infrastructure/module/product.module.mysql';
// import { ProductsModuleWithPostgreSQL } from './modules/products/infrastructure/module/product.module.postgresql';
// import { ProductsModuleWithSQLServer } from './modules/products/infrastructure/module/product.module.sqlserver';
// import { ProductsModuleWithTypeORM } from './modules/products/infrastructure/module/product.module.typeorm';
import { ProductsModuleWithPrisma } from './modules/products/infrastructure/module/product.module.prisma';
import { UserModuleWithPrisma } from './modules/users/infrastructure/module/user.module.prisma';
import { ProductsModuleWithMongoDB } from './modules/products/infrastructure/module/product.module.mongodb';
import { ProductsModuleWithMySQL } from './modules/products/infrastructure/module/product.module.mysql';
import { ProductsModuleWithPostgreSQL } from './modules/products/infrastructure/module/product.module.postgresql';
import { ProductsModuleWithSQLServer } from './modules/products/infrastructure/module/product.module.sqlserver';
import { ProductsModuleWithTypeORM } from './modules/products/infrastructure/module/product.module.typeorm';

@Module({
  imports: [ProductsModuleWithPrisma,UserModuleWithPrisma]
})
export class AppModule {}
