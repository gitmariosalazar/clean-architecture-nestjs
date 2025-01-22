import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProductRepository } from 'src/modules/products/domain/contract/product.repository.interface';
import { ProductEntity } from '../../../models/entities/product.entity';
import { DatabaseServiceMySQL } from 'src/shared/database/mysql.service';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import * as console from 'node:console';
import { ProductModel } from '../../../../domain/schemas/model/product.model';

@Injectable()
export class ProductRepositoryMySQLImplementation
  implements InterfaceProductRepository
{
  constructor(
    @Inject(DatabaseServiceMySQL)
    private readonly dataService: DatabaseServiceMySQL,
  ) {}

  async createProduct(
    productModel: ProductModel,
  ): Promise<ProductResponse | null> {
    const query = `
        INSERT INTO product (code, description, iva, mark, name, percentage_increment, public_price, quantity, supplier_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      productModel.getCode(),
      productModel.getDescription(),
      productModel.getIva(),
      productModel.getMark(),
      productModel.getName(),
      productModel.getPercentageIncrement(),
      productModel.getPublicPrice(),
      productModel.getQuantity(),
      productModel.getSupplierPrice(),
    ];

    try {
      const result = await this.dataService.query(query, values);
      if (result.affectedRows > 0) {
        const getProductQuery = `SELECT * FROM product WHERE code = ?`;
        const createdProduct = await this.dataService.query<ProductResponse>(
          getProductQuery,
          [productModel.getCode()],
        );
        return createdProduct[0];
      }
      return null;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const query = 'SELECT * FROM product WHERE code = ?';
    const result = await this.dataService.query<ProductEntity>(query, [code]);

    if (result.length > 0) {
      const row = result[0];
      return {
        code: row.code,
        description: row.description,
        iva: row.iva,
        mark: row.mark,
        name: row.name,
        percentage_increment: row.percentage_increment,
        public_price: row.public_price,
        quantity: row.quantity,
        supplier_price: row.supplier_price,
      };
    }
    return null;
  }

  async deleteProduct(code: string): Promise<boolean> {
    const query = `DELETE FROM product WHERE code = ?`;
    try {
      const result = await this.dataService.query(query, [code]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  async updateProduct(
    productModel: ProductModel,
    code: string,
  ): Promise<ProductResponse | null> {
    const query = `
        UPDATE product
        SET description          = ?,
            iva                  = ?,
            mark                 = ?,
            name                 = ?,
            percentage_increment = ?,
            public_price         = ?,
            quantity             = ?,
            supplier_price       = ?
        WHERE code = ?
    `;
    const values = [
      productModel.getDescription(),
      productModel.getIva(),
      productModel.getMark(),
      productModel.getName(),
      productModel.getPercentageIncrement(),
      productModel.getPublicPrice(),
      productModel.getQuantity(),
      productModel.getSupplierPrice(),
      code,
    ];
    try {
      const result = await this.dataService.query(query, values);
      if (result.affectedRows > 0) {
        const getProductQuery = `SELECT * FROM product WHERE code = ?`;
        const updatedProduct = await this.dataService.query<ProductResponse>(
          getProductQuery,
          [code],
        );
        return updatedProduct[0] || null;
      }
      return null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    const query = `SELECT * FROM product`;
    try {
      return await this.dataService.query<ProductResponse>(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}
