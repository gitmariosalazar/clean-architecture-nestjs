import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductModel } from '../../domain/schemas/model/product.model';

export class ProductMapper {
  static productRequestToProductModel(productRequest: ProductRequest):ProductModel {
    return new ProductModel(
      productRequest.code,
      productRequest.description,
      productRequest.iva,
      productRequest.mark,
      productRequest.name,
      0,
      0,
      productRequest.quantity,
      productRequest.supplier_price,
    );
  }
}