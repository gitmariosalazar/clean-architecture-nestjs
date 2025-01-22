import { ProductResponse } from '../schemas/dto/response/product.response';
import { ProductModel } from '../schemas/model/product.model';


export interface InterfaceProductRepository {
  findAllProducts(): Promise<ProductResponse[]>;
  findProductByCode(code: string): Promise<ProductResponse | null>;
  createProduct(productModel: ProductModel): Promise<ProductResponse | null>;
  deleteProduct(code: string): Promise<boolean>;
  updateProduct(productModel: ProductModel, code: string): Promise<ProductResponse | null>;
}
