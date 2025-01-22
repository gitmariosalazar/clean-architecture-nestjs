import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductUseCaseService } from '../../application/service/product-use-case.service';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productUseCaseService: ProductUseCaseService) {}

  @Get()
  @ApiOperation({ summary: 'Method GET - Find all products ✅' })
  async getAllProducts(): Promise<ProductResponse[]> {
    return this.productUseCaseService.findAllProducts();
  }

  @Post()
  @ApiOperation({summary: 'Method POST - Create new product'})
  async saveProduct(
    @Body() productRequest: ProductRequest,
  ): Promise<ProductResponse> {
    return this.productUseCaseService.createProduct(productRequest);
  }

  @Get(':code')
  @ApiOperation({summary: 'Method GET - Find a product by code ✅'})
  async getProductByCode(
    @Param('code') code: string,
  ): Promise<ProductResponse | null> {
    return this.productUseCaseService.findProductByCode(code);
  }

  @Put(':code')
  @ApiOperation({ summary: 'Method PUT - Update product by code ✅' })
  async updateProduct(
    @Param('code') code: string,
    @Body() productRequest: ProductRequest,
  ): Promise<ProductResponse> {
    return this.productUseCaseService.updateProduct(productRequest, code);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Method DELETE - Delete product information by code ✅' })
  async deleteProduct(@Param('code') code: string): Promise<boolean> {
    return this.productUseCaseService.deleteProduct(code);
  }
}
