import { Inject, Injectable } from '@nestjs/common';
import { InterfaceUseCaseProductService } from '../usecase/product-use-case.interface';
import { InterfaceProductRepository } from '../../domain/contract/product.repository.interface';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../domain/schemas/model/product.model';
import { envs } from '../../../../settings';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductUseCaseService implements InterfaceUseCaseProductService {
  private readonly percentage_increment: number = parseFloat(`${envs.percentage_increment}`);

  constructor(
    @Inject('ProductRepository') // Repository injection as dependency
    private readonly productRepository: InterfaceProductRepository,
  ) {}

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    return await this.productRepository.findProductByCode(code);
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    return this.productRepository.findAllProducts();
  }

  createProduct(
    productRequest: ProductRequest,
  ): Promise<ProductResponse | null> {
    // PriceFinal=(PriceActual×((100+percentage_increment)/100))×((100+iva)/100)
    const publicPrice: number = this.calculatePublicPrice(
      this.percentage_increment,
      productRequest.iva,
      productRequest.supplier_price,
    );
    const productModel: ProductModel = ProductMapper.productRequestToProductModel(productRequest);
    productModel.setPercentageIncrement(this.percentage_increment);
    productModel.setPublicPrice(publicPrice);
    /*
    const productModel: ProductModel = new ProductModel(
      productRequest.code,
      productRequest.description,
      productRequest.iva,
      productRequest.mark,
      productRequest.name,
      this.percentage_increment,
      publicPrice,
      productRequest.quantity,
      productRequest.supplier_price,
    );
    */
    return this.productRepository.createProduct(productModel);
  }

  deleteProduct(code: string): Promise<boolean> {
    return this.productRepository.deleteProduct(code);
  }

  updateProduct(
    productRequest: ProductRequest,
    code: string,
  ): Promise<ProductResponse | null> {
    const publicPrice: number = this.calculatePublicPrice(
      this.percentage_increment,
      productRequest.iva,
      productRequest.supplier_price,
    );
    const productModel: ProductModel = ProductMapper.productRequestToProductModel(productRequest);
    productModel.setPercentageIncrement(this.percentage_increment);
    productModel.setPublicPrice(publicPrice);
    /*
    const productModel: ProductModel = new ProductModel(
      productRequest.code,
      productRequest.description,
      productRequest.iva,
      productRequest.mark,
      productRequest.name,
      this.percentage_increment,
      publicPrice,
      productRequest.quantity,
      productRequest.supplier_price,
    );
    */
    return this.productRepository.updateProduct(productModel, code);
  }

  private calculatePublicPrice(
    percentage: number,
    iva: number,
    price: number,
  ): number {
    const aux: number =
      price * ((100 + percentage) / 100) * ((100 + iva) / 100);
    return parseFloat(aux.toFixed(2));
  }
}
