import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @ApiProperty({
    example: 'PT001TECH',
    description: 'Unique product code used for identification.',
    uniqueItems: true,
  })
  public code: string;

  @ApiProperty({
    example: 12,
    description: 'IVA (tax) percentage applied to the product.',
  })
  public iva: number;

  @ApiProperty({
    example: 'SONY',
    description: 'Brand or mark of the product.',
  })
  public mark: string;

  @ApiProperty({
    example: 'Mouse Keyboard',
    description: 'Name of the product.',
  })
  public name: string;

  @ApiProperty({
    example: 50,
    description: 'Available quantity of the product in stock.',
  })
  public quantity: number;

  @ApiProperty({
    example: 12.5,
    description: 'Supplier price of the product.',
  })
  public supplier_price: number;

  @ApiProperty({
    example: 'This is a high-quality wireless mouse.',
    description: 'Additional details or description of the product.',
    required: false, // Indicates that this property is optional
  })
  public description?: string;
}
