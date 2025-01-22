import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InterfaceProductRepository } from 'src/modules/products/domain/contract/product.repository.interface';
import { Product } from '../schemas/product.model.schema';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { ProductModel } from 'src/modules/products/domain/schemas/model/product.model';

@Injectable()
export class ProductRepositoryMongoDBImplementation
  implements InterfaceProductRepository
{
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(productModel: ProductModel): Promise<ProductResponse | null> {
    const productToSave = new this.productModel({
      code: productModel.getCode(),
      description: productModel.getDescription(),
      iva: productModel.getIva(),
      mark: productModel.getMark(),
      name: productModel.getName(),
      percentage_increment: productModel.getPercentageIncrement(),
      public_price: productModel.getPublicPrice(),
      quantity: productModel.getQuantity(),
      supplier_price: productModel.getSupplierPrice(),
    });
    const savedProduct = await productToSave.save();
    return {
      code: savedProduct.code,
      description: savedProduct.description,
      iva: savedProduct.iva,
      mark: savedProduct.mark,
      name: savedProduct.name,
      percentage_increment: savedProduct.percentage_increment,
      public_price: savedProduct.public_price,
      quantity: savedProduct.quantity,
      supplier_price: savedProduct.supplier_price,
    };
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    const products = await this.productModel.find();

    return products.map((product) => {
      return {
        code: product.code,
        description: product.description,
        iva: product.iva,
        mark: product.mark,
        name: product.name,
        percentage_increment: product.percentage_increment,
        public_price: product.public_price,
        quantity: product.quantity,
        supplier_price: product.supplier_price,
      };
    });
  }

  // Search product by code
  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const product = await this.productModel.findOne({ code }).exec();

    if (product) {
      return {
        code: product.code,
        description: product.description,
        iva: product.iva,
        mark: product.mark,
        name: product.name,
        percentage_increment: product.percentage_increment,
        public_price: product.public_price,
        quantity: product.quantity,
        supplier_price: product.supplier_price,
      };
    }
    return null;
  }

  async deleteProduct(code: string): Promise<boolean> {
    const resut = await this.productModel.deleteOne({ code });
    return resut.deletedCount > 0;
  }

  async updateProduct(
    product: ProductModel,
    code: string,
  ): Promise<ProductResponse | null> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { code },
      {
        $set: {
          description: product.getDescription(),
          iva: product.getIva(),
          mark: product.getMark(),
          name: product.getName(),
          percentage_increment: product.getPercentageIncrement(),
          public_price: product.getPublicPrice(),
          quantity: product.getQuantity(),
          supplier_price: product.getSupplierPrice(),
        },
      },
      { new: true },
    );
    return updatedProduct ? updatedProduct : null;
  }
}
