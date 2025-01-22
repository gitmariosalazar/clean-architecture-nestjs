
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';

export interface InterfaceUseCaseProductService {
  findAllProducts(): Promise<ProductResponse[]>;
  findProductByCode(code: string): Promise<ProductResponse | null>;
  createProduct(productRequest: ProductRequest): Promise<ProductResponse | null>;
  deleteProduct(code: string): Promise<boolean>;
  updateProduct(productRequest: ProductRequest, code: string): Promise<ProductResponse | null>;
}

export interface IResponse {
  success: boolean;
  data?: any;
  error?: string;
}
