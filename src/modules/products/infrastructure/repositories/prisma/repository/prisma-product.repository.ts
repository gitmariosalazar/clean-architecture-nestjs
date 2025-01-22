import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { InterfaceProductServiceRepository } from '../../../contracts/product-service.interface';
import { ProductModel } from '../../../../domain/schemas/model/product.model';

@Injectable()
export class ProductRepositoryPrismaImplementation
  implements InterfaceProductServiceRepository
{
  private readonly logger = new Logger(
    ProductRepositoryPrismaImplementation.name,
  );

  constructor(private readonly prisma: PrismaService) {}

  // Method to get all products
  async findAllProducts(): Promise<ProductResponse[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => ({
      code: product.code,
      description: product.description,
      iva: product.iva,
      mark: product.mark,
      name: product.name,
      percentage_increment: product.percentage_increment,
      public_price: product.public_price,
      quantity: product.quantity,
      supplier_price: product.supplier_price,
    }));
  }

  // Method to find a product by code
  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const product = await this.prisma.product.findUnique({
      where: { code },
    });
    if (!product) return null;

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

  async createProduct(
    productModel: ProductModel,
  ): Promise<ProductResponse | null> {
    return this.prisma.product.create({
      data: {
        code: productModel.getCode(),
        description: productModel.getDescription(),
        iva: productModel.getIva(),
        mark: productModel.getMark(),
        name: productModel.getName(),
        percentage_increment: productModel.getPercentageIncrement(),
        public_price: productModel.getPublicPrice(),
        quantity: productModel.getQuantity(),
        supplier_price: productModel.getSupplierPrice(),
      },
    });
  }

  async deleteProduct(code: string): Promise<boolean> {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { code: code },
      });
      console.log(`Deleted product:`, deletedProduct);
      return true;
    } catch (error) {
      console.error(`Error deleting product with code ${code}:`, error);
      if (error.code === 'P2025') {
        console.error('No product found with the given code.');
        return false;
      }
      throw error;
    }
  }

  updateProduct(
    productModel: ProductModel,
    code: string,
  ): Promise<ProductResponse | null> {
    return this.prisma.product.update({
      data: {
        code: productModel.getCode(),
        description: productModel.getDescription(),
        iva: productModel.getIva(),
        mark: productModel.getMark(),
        name: productModel.getName(),
        percentage_increment: productModel.getPercentageIncrement(),
        public_price: productModel.getPublicPrice(),
        quantity: productModel.getQuantity(),
        supplier_price: productModel.getSupplierPrice(),
      },
      where: { code: code },
    });
  }
}
