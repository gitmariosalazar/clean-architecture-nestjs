import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProductRepository } from 'src/modules/products/domain/contract/product.repository.interface';
import { DatabaseServicePostgreSQL } from 'src/shared/database/postgresql.service';
import { ProductEntity } from '../../../models/entities/product.entity';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { ProductModel } from 'src/modules/products/domain/schemas/model/product.model';

@Injectable()
export class ProductRepositoryPostgresImplementation
  implements InterfaceProductRepository
{
  constructor(
    @Inject(DatabaseServicePostgreSQL)
    private readonly databaseService: DatabaseServicePostgreSQL,
  ) {}
  async createProduct(
    productModel: ProductModel,
  ): Promise<ProductResponse | null> {
    const query = `
      INSERT INTO product (code, description, iva, mark, name, percentage_increment, public_price, quantity, supplier_price) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
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
      const result = await this.databaseService.query<ProductResponse>(
        query,
        values,
      );
      console.log(result)
      return result[0] || null;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const query = 'SELECT * FROM product WHERE code = $1';
    try {
      const result = await this.databaseService.query<ProductEntity>(query, [
        code,
      ]);

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
    } catch (error) {
      console.error('Error fetching product by code:', error);
      return null;
    }
  }

  async deleteProduct(code: string): Promise<boolean> {
    const query = 'DELETE FROM product WHERE code = $1';
    try {
      const result = await this.databaseService.query(query, [code]);
      return true;
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
      SET description = $1,
          iva = $2,
          mark = $3,
          name = $4,
          percentage_increment = $5,
          public_price = $6,
          quantity = $7,
          supplier_price = $8
      WHERE code = $9
      RETURNING *;
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
      const result = await this.databaseService.query<ProductResponse>(
        query,
        values,
      );
      return result[0] || null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    const query = 'SELECT * FROM product';
    try {
      return await this.databaseService.query<ProductResponse>(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}
