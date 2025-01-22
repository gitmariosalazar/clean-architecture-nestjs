import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../models/entities/product.entity';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../../domain/schemas/model/product.model';
import { InterfaceProductServiceRepository } from '../../../contracts/product-service.interface';

@Injectable()
export class ProductRepositoryTypeORMImplementation
  implements InterfaceProductServiceRepository
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: ProductModel): Promise<ProductResponse | null> {
    const productEntity: ProductEntity = new ProductEntity(
      product.getCode(),
      product.getDescription(),
      product.getIva(),
      product.getMark(),
      product.getName(),
      product.getPercentageIncrement(),
      product.getPublicPrice(),
      product.getQuantity(),
      product.getSupplierPrice(),
    );
    const newProduct = this.productRepository.create(productEntity);

    try {
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Error saving product');
    }
    return null;
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.find();
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const product = await this.productRepository.findOne({ where: { code } });
    if (product) {
      return product;
    }
    return null;
  }

  async deleteProduct(code: string): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { code } });
    if (!product) {
      return false;
    }

    try {
      await this.productRepository.remove(product);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  async updateProduct(
    productRequest: ProductModel,
    code: string,
  ): Promise<ProductResponse | null> {
    const product = await this.productRepository.findOne({ where: { code } });
    if (!product) {
      return null;
    }
    product.description = productRequest.getDescription();
    product.iva = productRequest.getIva();
    product.mark = productRequest.getMark();
    product.name = productRequest.getName();
    product.percentage_increment = productRequest.getPercentageIncrement();
    product.public_price = productRequest.getPublicPrice();
    product.quantity = productRequest.getQuantity();
    product.supplier_price = productRequest.getSupplierPrice();

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }
}
