import { Module } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductController } from '../controller/product.controller';
import { ProductRepositoryMongoDBImplementation } from '../repositories/mongodb/repository/mongo-product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../repositories/mongodb/schemas/mongo.schema.product';
import { CONFIG_DATABASE_MONGODB } from 'src/shared/database/mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CONFIG_DATABASE_MONGODB(),
  ],
  controllers: [ProductController],
  providers: [
    ProductUseCaseService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryMongoDBImplementation,
    },
  ],
})
export class ProductsModuleWithMongoDB {}
