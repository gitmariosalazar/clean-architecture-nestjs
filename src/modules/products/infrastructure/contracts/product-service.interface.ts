import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../domain/schemas/model/product.model';

export interface InterfaceProductServiceRepository {
  findAllProducts(): Promise<ProductResponse[]>;
  findProductByCode(code: string): Promise<ProductResponse | null>;
  createProduct(productModel: ProductModel): Promise<ProductResponse | null>;
  deleteProduct(code: string): Promise<boolean>;
  updateProduct(productModel: ProductModel, code: string): Promise<ProductResponse | null>;
}
